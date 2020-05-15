using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireAdminRole")]

    public class UserToAdminController : ControllerBase
    {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        public UserToAdminController(IGroupRepository repo, UserManager<User> userManager, IMapper mapper, DataContext context)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }

   [HttpGet]
    public async Task<IActionResult> GetUsersToAdmin ([FromQuery] AdminParams adminParams) {
    var currentUserId = int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value);
    var userFromRepo = await _repo.GetUser (currentUserId);
    adminParams.UserId = currentUserId;
    if (string.IsNullOrEmpty (adminParams.Gender)) {
        adminParams.Gender = userFromRepo.Gender == "طالبه"?"طالبه":"'طالبه'";
    }

    if (string.IsNullOrEmpty (adminParams.UserGroupName)) {
        adminParams.UserGroupName = userFromRepo.UserGroup.UserGroupName;
    }

    if (string.IsNullOrEmpty (adminParams.UserClassName)) {
        adminParams.UserClassName = userFromRepo.UserClass.UserClassName;
    }

    var users = await _repo.GetUsersToAdmin (adminParams);
    var UserToReturn = _mapper.Map<IEnumerable<UserToAdminListDto>> (users);
    Response.AddPagination (users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
    return Ok (UserToReturn);
}

[HttpGet ("{id}")]

public async Task<IActionResult> GetUserToAdmin (int id) {
    var user = await _repo.GetUserToAdmin (id);
    var userToReturn = _mapper.Map<UserToAdminForDetailsDto> (user);
    return Ok (userToReturn);
}
 




// userAttend Methods
[HttpGet("{id}/userAttend/{userAttendId}" , Name ="GetUserAttend")]
public async Task<IActionResult> GetUserAttend(int userAttendId){
    var userAttendFromRepo = await _repo.GetUserAttend(userAttendId);
    var userAttend = _mapper.Map<UserAttend>(userAttendFromRepo);
    return Ok(userAttend);
}
// AddAttendToUser
[HttpPost("{id}/userAttend")]
public async Task<IActionResult> AddAttendToUser (int id  , UserAttendToCreateDto  userUpdateAttentToCreateDto){
    var user = await _repo.GetUserToAdmin(id);

        var userAttend = _mapper.Map<UserAttend>(userUpdateAttentToCreateDto);
        user.UserAttends.Add(userAttend);
        if (await _repo.SaveAll())
        {
            var userAttendToReturn = _mapper.Map<UserAttendToReturnDto>(userAttend);
            return CreatedAtRoute(new { controller = "UserToAdmin", id = userAttend.UserAttendId }, userAttendToReturn);
    }
return BadRequest("error");
}
// deleteUserAttend
[HttpDelete("{id}/userAttend/{userAttendId}")]
public async Task<IActionResult> DeleteUserAttend(int id , int userAttendId)
{
var userAttend = await _repo.GetUserAttend(userAttendId);
_repo.Delete(userAttend);
if(await _repo.SaveAll()){
return Ok("تم حذف الحضور");
}
return BadRequest("فشل في حذف الحضور");
}
// Update UserAttend
[HttpPut("{id}/userAttend/{userAttendId}")]
public async Task<IActionResult> UpdateUserAttend(int userAttendId  , UserAttendToUpdateDto userAttendToUpdateDto ){
                var userFormRepo = await _repo.GetUserAttend (userAttendId);
            _mapper.Map (userAttendToUpdateDto, userFormRepo);
            if (await _repo.SaveAll ()) {
                return NoContent ();
            }
            throw new Exception ("حدث مشكله في تعديل البيانات ");
}


    
        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUsers(UserToAdminForCreateDto userToAdminForCreateDto)
        {
            var userToCreate = _mapper.Map<User>(userToAdminForCreateDto);

            bool userAlreadyExists = _context.User.Any(x => x.UserName == userToCreate.UserName);
            if (userAlreadyExists)
            {
                return BadRequest("هذا العضو موجود من قبل");
            }

            var result = await _userManager.CreateAsync(userToCreate, userToAdminForCreateDto.Password);
            var userToReturn = _mapper.Map<UserToAdminForCreateDto, User>(userToAdminForCreateDto, userToCreate);
            if (result.Succeeded)
            {
                return CreatedAtRoute("GetUser", new { controller = "User", id = userToCreate.Id }, userToReturn);
            }
            return BadRequest(result.Errors);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserToAdmin(int id, UserToAdminForUpdateDto userToAdminForUpdateDto)
        {
            var userFormRepo = await _repo.GetUser(id);
            _mapper.Map(userToAdminForUpdateDto, userFormRepo);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"حدث مشكله في تعديل البيانات {id}");
        }
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers(){
            var users = await _repo.GetAllUsers();
            var UserToReturn = _mapper.Map<IEnumerable<UserToAdminListDto>>(users);
            return Ok(UserToReturn);
        } 

        [HttpGet("userWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles(){
            var userList = await (from user in _context.Users orderby user.UserName select new {
                Id = user.Id,
                UserName = user.UserName,
                Password = user.Password,
                ArabicName = user.ArabicName,
                UserPhone = user.UserPhone,
                Gender=user.Gender,
                GuardianName = user.GuardianName,
                GuardianPhone =user.GuardianPhone,
                UserClassName = user.UserClass.UserClassName,
                UserGroupName = user.UserGroup.UserGroupName,
                userVillageName = user.UserVillage.UserVillageName,

                Roles = (from UserRole in user.UserRoles join role in _context.Roles on UserRole.RoleId 
                        equals  role.Id select role.Name).ToList()
            }).ToListAsync();
            return Ok(userList);
        }
[HttpPost ("editroles/{userName}")]
public async Task<IActionResult> EditRoles (string userName, RoleEditDto roleEditDto) {
    var user = await _userManager.FindByNameAsync (userName);
    // تعرض الرتب المتاحة للمستخدم 
    var userRoles = await _userManager.GetRolesAsync (user);
    // معرفة الرتب التي سيتم اختيارها
    var selectedRoles = roleEditDto.RoleNames;
    // اختيار هل تم حذف المستخدم بالرتب ام لا بالترتب 
    // null collesing لو القيمة الشمال لا تساول الفارغ تاخذ القيمة  ولو القيمة الشمال فارغة تاخد القيمة ناحية اليمين
    selectedRoles = selectedRoles ?? new string[] { };
    var result = await _userManager.AddToRolesAsync (user, selectedRoles.Except (userRoles));
    if (!result.Succeeded)
        return BadRequest ("حدث خطأ أثناء إضافة الأدوار");
    result = await _userManager.RemoveFromRolesAsync (user, userRoles.Except (selectedRoles));
    if (!result.Succeeded)
        return BadRequest ("حدث خطأ أثناء حذف الأدوار");
    return Ok (await _userManager.GetRolesAsync (user));
}


// userExam
[HttpGet("{id}/userExam/{userExamId}" , Name ="GetUserExam")]
public async Task<IActionResult> GetUserExam(int userExamId){
    var userExamFromRepo = await _repo.GetUserExam(userExamId);
    var userExam = _mapper.Map<UserExam>(userExamFromRepo);
    return Ok(userExam);
}

[HttpDelete("{id}/userExam/{userExamId}")]
public async Task<IActionResult> DeleteUserExam(int id , int userExamId)
{
var userExam = await _repo.GetUserExam(userExamId);
_repo.Delete(userExam);
if(await _repo.SaveAll()){
return Ok("تم حذف الاختبار");
}
return BadRequest("فشل في حذف الاختبار");
}

[HttpPut("{id}/userExam/{userExamId}")]
public async Task<IActionResult> UpdateUserExam(int userExamId  , UserExamToUpdateDto userExamToUpdateDto ){
                var userFormRepo = await _repo.GetUserExam (userExamId);
            _mapper.Map (userExamToUpdateDto, userFormRepo);
            if (await _repo.SaveAll ()) {
                return NoContent ();
            }
            throw new Exception ("حدث مشكله في تعديل البيانات ");
}



        [HttpPost ("{id}/userExam")]
        public async Task<IActionResult> AddExamToUser (int id, UserExamToCreateDto userExamToCreateDto) {
            var user = await _repo.GetUser (id);

            var userExam = _mapper.Map<UserExam> (userExamToCreateDto);
            user.UserExams.Add (userExam);
            if (await _repo.SaveAll ()) {
                var userExamToReturn = _mapper.Map<UserExamToReturnDto> (userExam);
            return CreatedAtRoute(new { controller = "UserToAdmin", id = userExam.UserExamId }, userExamToReturn);
            }
            return BadRequest ("error");
        }



        [HttpPost ("{id}/userPay")]
        public async Task<IActionResult> AddUserPay (int id, UserPayToCreateDto userPayToCreateDto) {
            var user = await _repo.GetUser (id);

            var userPay = _mapper.Map<UserPay> (userPayToCreateDto);
            user.UserPays.Add (userPay);
            if (await _repo.SaveAll ()) {
                var userPayToReturn = _mapper.Map<UserPayToReturnDto> (userPay);
            return CreatedAtRoute(new { controller = "UserToAdmin", id = userPay.UserPayId }, userPayToReturn);

            }
            return BadRequest ("error");
        }

        // GetUserPay
        [HttpGet ("{id}/userPay/{userPayId}", Name = "GetUserPay")]
        public async Task<IActionResult> GetUserPay (int userPayId) {
            var userPay = await _repo.GetUserPay (userPayId);
            return Ok (userPay);
        }

[HttpDelete("{id}/userPay/{userPayId}")]
public async Task<IActionResult> DeleteUserPay(int id , int userPayId)
{
var userPay = await _repo.GetUserPay(userPayId);
_repo.Delete(userPay);
if(await _repo.SaveAll()){
return Ok("تم حذف الدفع");
}
return BadRequest("فشل في حذف الدفع");
}

[HttpPut("{id}/userPay/{userPayId}")]
public async Task<IActionResult> UpdateUsePay(int userPayId  , UserPayToUpdateDto userPayToUpdateDto ){
                var userFormRepo = await _repo.GetUserPay (userPayId);
            _mapper.Map (userPayToUpdateDto, userFormRepo);
            if (await _repo.SaveAll ()) {
                return NoContent ();
            }
            throw new Exception ("حدث مشكله في تعديل البيانات ");
}

    }
}