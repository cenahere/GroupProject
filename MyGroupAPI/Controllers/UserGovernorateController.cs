using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers {
        [Route("[controller]")]
        [ApiController]
        public class UserGovernorateController : ControllerBase {
        private readonly IMapper _mapper;
        private readonly IGroupRepository _repo;
        public UserGovernorateController (IGroupRepository repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }
        [AllowAnonymous]
        public async Task<IActionResult> GetUserGovernorates(){
            var userGovernorates = await _repo.GetUserGovernorates();
            return Ok(userGovernorates);
        }

        [HttpGet("{userGovernorateId}")]
        public async Task<IActionResult> GetUserGovernorate(int userGovernorateId){
            var userGovernorate = await _repo.GetUserGovernorate(userGovernorateId);
            return Ok (userGovernorate);
        }
        [HttpPost]
        public async Task<IActionResult> InsertUserGovernorate(UserGovernorateToCreateDto userGovernorateToCreateDto){
            var userGovernorateToCreate = _mapper.Map<UserGovernorate>(userGovernorateToCreateDto);
            _repo.Add(userGovernorateToCreate);
            if (await _repo.SaveAll())
            {
                return Ok(userGovernorateToCreate);
            }
            return BadRequest("فشل في الاضافة");
        }

        [HttpPut("{userGovernorateId}")]
        public async Task<IActionResult> UpdateUserGovernorate(int userGovernorateId,UserGovernorateToUpdateDto userGovernorateToUpdateDto){
            var userGovernorateToUpdate = await _repo.GetUserGovernorate(userGovernorateId);
            _mapper.Map<UserGovernorateToUpdateDto,UserGovernorate>(userGovernorateToUpdateDto,userGovernorateToUpdate);
                        if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("فشل في التعديل");
        }
        [HttpDelete("{userGovernorateId}")]
        public async Task<IActionResult> DeleteUserGovernorate(int userGovernorateId){
             var userGovernorateToDelete = await _repo.GetUserGovernorate(userGovernorateId);
            _repo.Delete(userGovernorateToDelete);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("فشل في حذف المحافظة");
        }

    }
}