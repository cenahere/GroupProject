using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        public AdminController(IGroupRepository repo, IMapper mapper, DataContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("payment")]
        public async Task<IActionResult> GetPayments()
        {
            var payments = await _repo.GetAllPayments();
            var paymentToReturn = _mapper.Map<IEnumerable<PaymentForReturnDto>>(payments);
            return Ok(paymentToReturn);
        }
     // AddAdmin
        [HttpPost ("user/{id}/role/{roleId}")]
        public async Task<IActionResult> AddUserRole (int id, int roleId) {
  

            var roleToUser = await _repo.GetUserRoles (id, roleId);
            if (roleToUser != null)
                return BadRequest ("هذا المستخدم مضاف  له الرتبة");
            if (await _repo.GetUser (id) == null)
                return NotFound ();
            roleToUser = new UserRoles {
                UserId = id,
                RoleId = roleId,
            };
            _repo.Add<UserRoles> (roleToUser);
            if (await _repo.SaveAll ())
                return Ok ();
            return BadRequest ("فشل في الاضافة");
        }





    }

}