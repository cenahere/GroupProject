using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Models;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace MyGroupAPI.Controllers {
    [Route ("[controller]")]
    [ApiController]
    public class UserVillageController : ControllerBase {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        public UserVillageController (IGroupRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }

        [AllowAnonymous]
        public async Task<IActionResult> GetUserVillages () {
            var userVillages = await _repo.GetUserVillages ();
            return Ok (userVillages);
        }

        [Authorize (Policy = "RequireAdminRole")]
        [HttpGet ("{userVillageId}")]
        public async Task<IActionResult> GetUserVillage (int userVillageId) {
            var userVillage = await _repo.GetUserVillage (userVillageId);
            return Ok (userVillage);
        }
        [Authorize(Policy="RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> InsertUserVillage(UserVillageToCreateDto userVillageToCreateDto){
            var village = _mapper.Map<UserVillage>(userVillageToCreateDto);
            _repo.Add(village);
            if (await _repo.SaveAll())
            {
                return Ok(village);
            }
            return BadRequest("فشل في الاضافة");
        }
        [HttpPut("{userVillageId}")]
        public async Task<IActionResult> UpdateUserVillage(int userVillageId ,UserVillageToUpdateDto userVillageToUpdateDto){
            var villageToUpdate = await _repo.GetUserVillage(userVillageId);
            _mapper.Map<UserVillageToUpdateDto,UserVillage>(userVillageToUpdateDto,villageToUpdate);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("فشل في التعديل");
        }
        [Authorize(Policy="RequireAdminRole")]
        [HttpDelete("{userVillageId}")]
        public async Task<IActionResult> DeleteUserVillage(int userVillageId)
        {
            var userVillage = await _repo.GetUserVillage(userVillageId);
            _repo.Delete(userVillage);
            if(await _repo.SaveAll()){
                return Ok("تم حذف القرية");
            }
            return BadRequest("فشل في حذف القرية");
        }


    }
}