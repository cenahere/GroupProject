using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;
using Stripe;

namespace MyGroupAPI.Controllers {
    [ServiceFilter (typeof (LogUserActivity))]
    [Authorize]
    [Route ("[controller]")]
    [ApiController]

    public class UserController : ControllerBase {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<StripeSettings> _stripeSettings;
        private readonly DataContext _context;
        public UserController (IGroupRepository repo, DataContext context, IMapper mapper, IOptions<StripeSettings> stripeSettings) {
            _context = context;
            _stripeSettings = stripeSettings;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers ([FromQuery] UserParams userParams) {
            var currentUserId = int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser (currentUserId);
            userParams.UserId = currentUserId;
            if (string.IsNullOrEmpty (userParams.Gender)) {
                userParams.Gender = userFromRepo.Gender == "طالب" ? "طالب" : "طالبه";
            }

            if (string.IsNullOrEmpty (userParams.UserVillageName)) {
                userParams.UserVillageName = userFromRepo.UserVillage.UserVillageName;
            }

            if (string.IsNullOrEmpty (userParams.UserClassName)) {
                userParams.UserClassName = userFromRepo.UserClass.UserClassName;
            }
        
                    if (string.IsNullOrEmpty (userParams.UserGroupName)) {
                userParams.UserGroupName = userFromRepo.UserGroup.UserGroupName;
            }

            var users = await _repo.GetUsers (userParams);
            var UserToReturn = _mapper.Map<IEnumerable<UserForListDto>> (users);
            Response.AddPagination (users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok (UserToReturn);
        }

        [HttpGet ("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser (int id) {
            var user = await _repo.GetUser (id);
            var userToReturn = _mapper.Map<UserForDetailsDto> (user);
            return Ok (userToReturn);
        }

        [HttpPut ("{id}")]
        public async Task<IActionResult> UpdateUser (int id, UserForUpdateDto userForUpdateDto) {
            if (id != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value))
                return Unauthorized ();
            var userFormRepo = await _repo.GetUser (id);
            _mapper.Map (userForUpdateDto, userFormRepo);
            if (await _repo.SaveAll ()) {
                return NoContent ();
            }
            throw new Exception ($"حدث مشكله في تعديل البيانات {id}");
        }

        [HttpPost ("{userId}/charge/{stripeToken}")]
        // البرمتر الثاتي الستريب توكن لازم يجي من الانجولر بالتالي لن تصح التنفيذ علي الانجولر 
        public async Task<IActionResult> Charge (int userId, string stripeToken) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value))
                return Unauthorized ();
            // انشاء عميل 
            var customers = new CustomerService ();
            // انشاء عملية سداد 
            var charges = new ChargeService ();
            // انشاء العميل 
            var customer = customers.Create (new CustomerCreateOptions {
                // البطاقة الائتمانية 
                SourceToken = stripeToken
            });
            // انشاء عملية الدفع 
            var charge = charges.Create (new ChargeCreateOptions {
                Amount = 1000, // القيمة تعادل خمسين دولار  
                    Description = "تسديد اشتراك المجموعة", // التقاصيل 
                    Currency = "usd", // العمله بالدولار 
                    CustomerId = customer.Id
            });
            // لان البيانات هي الداتا لاداعي لانشاء DTO
            var payment = new Payment {
                PaymentDate = DateTime.Now,
                Amount = charge.Amount / 100,
                UserId = int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value),
                UserName = User.FindFirst (ClaimTypes.Name).Value,
                ReceiptUrl = charge.ReceiptUrl,
                Description = charge.Description,
                Currency = charge.Currency,
                IsPaid = charge.Paid // المهم 
            };
            // اضافة الواحده
            _repo.Add<Payment> (payment);
            if (await _repo.SaveAll ()) {
                return Ok (new { IsPaid = charge.Paid });
            }
            return BadRequest ("فشل في عملية السداد الاكتروني");
        }


    }
}