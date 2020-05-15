using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers {

    [Route ("[controller]")]
    [ApiController]
    public class UserClassController : ControllerBase {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        public UserClassController (IGroupRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }
        [AllowAnonymous]
        public async Task<IActionResult> GetUsersClasses() {
            var userClasses = await  _repo.GetUserAllClasses();
            return Ok (userClasses);
        }
        [Authorize (Policy = "RequireAdminRole")]
        [HttpGet ("{userClassId}" , Name ="GetUserClass")]
        public async Task<IActionResult> GetUserClass (int userClassId) {
            var userClass = await _repo.GetUserClass (userClassId);
            return Ok (userClass);
        }
        [Authorize (Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> AddUserClass (int userClassId, UserClassForCreateDto userClassForCreateDto) {
            var userClass = _mapper.Map<UserClass> (userClassForCreateDto);
            _repo.Add (userClass);

            if (await _repo.SaveAll ()) {
                return Ok (userClass);
            }
            return BadRequest ("فشل في الاضافة");
        }
        [Authorize (Policy = "RequireAdminRole")]

        [HttpPut ("{userClassId}")]
        public async Task<IActionResult> UpdateUserClass (int userClassId, UserClassForUpdateDto userClassForUpdateDto) {
            var userClassToUpdate = await _repo.GetUserClass (userClassId);
            _mapper.Map<UserClassForUpdateDto, UserClass> (userClassForUpdateDto, userClassToUpdate);
            if (await _repo.SaveAll ()) {
                return NoContent ();
            }
            return BadRequest ("فشل في التعديل");
        }
        [Authorize (Policy = "RequireAdminRole")]

        [HttpDelete ("{userClassId}")]
        public async Task<IActionResult> DeleteUserClass (int userClassId) {

            var userClass = await _repo.GetUserClass (userClassId);
            _repo.Delete (userClass);
            if (await _repo.SaveAll ()) {
                return Ok ("تم حذف الفصل الدراسي");
            }
            return BadRequest ("لا يمكن حذف الفصل قطعيا");
        }

        // GetUserGroup
        [AllowAnonymous]
        
        [HttpGet("userGroup")]
        public async Task<IActionResult> GetUserGroups(){
            var userGroups = await _repo.UserGroups();
            return Ok(userGroups);
        }
        [HttpGet("userGroup/{userGroupId}" , Name ="GetUserGroup")]
        public async Task<IActionResult> GetUserGroup(int userGroupId){
            var userGroup =await _repo.UserGroup(userGroupId);
            return Ok(userGroup);
        }

        // addGroupToUserClass
        [HttpPost("{userClassId}/userGroup")]
        public async Task<IActionResult> AddGroupToUserClass(int userClassId , UserGroupToCrateDto userGroupToCrateDto){
            var userClassFromRepo = await _repo.GetUserClass(userClassId);
            var userGroup = _mapper.Map<UserGroup>(userGroupToCrateDto);
            userClassFromRepo.UserGroups.Add(userGroup);
            if(await _repo.SaveAll()){
                var userGroupToreturn = _mapper.Map<UserGroupToRetrunDto>(userGroup);
                return CreatedAtRoute("GetUserClass" , new UserGroup {UserGroupId = userGroup.UserGroupId} , userGroupToreturn);
            }
            return BadRequest("error to add group");
        }
        


        

    }
}