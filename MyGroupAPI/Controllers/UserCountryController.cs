using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers {
    [ApiController]
    [Route ("[controller]")]
    public class UserCountryController : ControllerBase {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        public UserCountryController (IGroupRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;

        }
        [AllowAnonymous]
        public async Task<IActionResult> GetUserCountries () {
            var userCountries = await _repo.GetUserCountries ();
            return Ok (userCountries);
        }

        [Authorize (Policy = "RequireAdminRole")]
        [HttpGet ("{userCountryId}")]
        public async Task<IActionResult> GetUserCountry (int userCountryId) {
            var userCountry = await _repo.GetUserCountry (userCountryId);
            return Ok (userCountry);
        }

        [Authorize (Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> InsertUserCountry (UserCountryToCreateDto userCountryToCreateDto) {
            var userCountryToCreate = _mapper.Map<UserCountry> (userCountryToCreateDto);
            _repo.Add (userCountryToCreate);
            if (await _repo.SaveAll ()) {
                return Ok (userCountryToCreate);
            }
            return BadRequest ("فشل في الاضافة");
        }

        [Authorize (Policy = "RequireAdminRole")]
        [HttpPut ("{userCountryId}")]
        public async Task<IActionResult> UpdateCity (int userCountryId, UserCountryToUpdateDto userCountryToUpdateDto) {
            var userCountryToUpdate = await _repo.GetUserCountry (userCountryId);
            _mapper.Map<UserCountryToUpdateDto, UserCountry> (userCountryToUpdateDto , userCountryToUpdate);
            if (await _repo.SaveAll ()) {
                return NoContent ();
            }
            return BadRequest ("فشل في التعديل");

        }
        // delete city
        [HttpDelete ("{userCountryId}")]
        public async Task<IActionResult> DeleteCity (int userCountryId) {
            var userCountryToDelete = await _repo.GetUserCountry (userCountryId);
            _repo.Delete (userCountryToDelete);
            if (await _repo.SaveAll ()) {
                return Ok ("تم حذف الدولة");
            }
            return BadRequest ("فشل في حذف الدولة");
        }

    }
}