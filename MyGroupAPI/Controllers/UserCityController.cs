using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers {
    [AllowAnonymous]
    [Route ("[controller]")]
    [ApiController]
    public class UserCityController : ControllerBase {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;

        public UserCityController (IGroupRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;

        }

        public async Task<IActionResult> GetCities () {
            var cities = await _repo.GetUserCities ();
            return Ok (cities);
        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("{userCityId}")]
        public async Task<IActionResult> getCity (int userCityId) {
            var userCity = await _repo.GetUserCity (userCityId);
            return Ok (userCity);
        }
    [Authorize(Policy = "RequireAdminRole")]

        [HttpPost]
        public async Task<IActionResult> InsertCity (CityForInsertDto cityForInsertDto ) {
            var city = _mapper.Map<UserCity>(cityForInsertDto);
            _repo.Add(city);

            if(await _repo.SaveAll()){
                return Ok(city);
            }
            return BadRequest("فشل في الاضافة");
        }
            [Authorize(Policy = "RequireAdminRole")]

        [HttpPut("{userCityId}")]
        public async Task<IActionResult> UpdateCity(int userCityId , CityForUpdateDto cityForUpdateDto){
            var cityToUpdate = await _repo.GetUserCity(userCityId);
            _mapper.Map<CityForUpdateDto,UserCity>(cityForUpdateDto,cityToUpdate);
            if(await _repo.SaveAll()){
                return NoContent();
            }
            return BadRequest("فشل في التعديل");
        }
            [Authorize(Policy = "RequireAdminRole")]

        [HttpDelete("{userCityId}")]
        public async Task<IActionResult> DeleteCity(int userCityId)
        {
            var city = await _repo.GetUserCity(userCityId);
            _repo.Delete(city);
            if(await _repo.SaveAll()){
                return Ok("تم حذف المركز");
            }
            return BadRequest("فشل في حذف المركز");
        }

    }
}