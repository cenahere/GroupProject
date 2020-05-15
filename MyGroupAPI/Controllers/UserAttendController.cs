using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers {
    [ServiceFilter (typeof (LogUserActivity))]
    [Route ("[controller]")]
    [ApiController]
    public class UserAttendController : ControllerBase {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        public UserAttendController (IGroupRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }

        // [HttpPost("user/{id}")]
        // public async Task<IActionResult> AddAttendToUser (int id  , UserUpdateAttentToCreateDto  userUpdateAttentToCreateDto){
        //     var user = await _repo.GetUser(id);

        //         var userAttend = _mapper.Map<UserAttend>(userUpdateAttentToCreateDto);
        //         user.UserAttends.Add(userAttend);
        //         if (await _repo.SaveAll())
        //         {
        //             var userAttendToReturn = _mapper.Map<UserUpdateAttentToReturnDto>(userAttend);
        //             return CreatedAtRoute("GetUserAttend" , new UserAttend{UserAttendId = userAttend.UserAttendId }, userAttendToReturn);

        //     }
        // return BadRequest("error");
        // }

        // // GetUserAttend
        // [HttpGet("{userAttendId}" , Name ="GetUserAttend")]
        // public async Task<IActionResult> GetUserAttend(int userAttendId){
        //     var userAttend = await _repo.GetUserAttend(userAttendId);
        //     var userToReturn = _mapper.Map<UserAttendDetailsDto> (userAttend);
        //     return Ok(userAttend);
        // }

// [HttpGet]
// public async Task<IActionResult> GetUsersAttends(){
//     var userAttends = await _repo.GetUsersAttend();
//     var userAttendToReturn = _mapper.Map<IEnumerable<UserAttendToListDto>> (userAttends);
//     return Ok(userAttendToReturn);

// }













 }
}