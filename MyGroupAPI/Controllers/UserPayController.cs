using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers
{
    [ServiceFilter (typeof (LogUserActivity))]
    [Route ("[controller]")]
    [ApiController]
    public class UserPayController : ControllerBase
    {
          private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        public UserPayController (IGroupRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }



        // [HttpGet]
        // public async Task<IActionResult> GetUsersPays () {
        //     var userPays = await _repo.GetUsersPay ();
        //     var userPayToRetrun = _mapper.Map<IEnumerable<UserPayToListDto>> (userPays);
        //     return Ok (userPayToRetrun);

        // }

    
    }
}