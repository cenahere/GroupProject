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
    public class UserExamController : ControllerBase {
        private readonly IGroupRepository _repo;
        private readonly IMapper _mapper;
        public UserExamController (IGroupRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }



        // // GetUserAttend
        // [HttpGet ("{userExamId}", Name = "GetUserUserExam")]
        // public async Task<IActionResult> GetUserExam (int userExamId) {
        //     var userExam = await _repo.GetUserAttend (userExamId);
        //     return Ok (userExam);
        // }

        // [HttpGet]
        // public async Task<IActionResult> GetUsersExams () {
        //     var userExams = await _repo.GetUsersExams ();
        //     var userExamToRetrun = _mapper.Map<IEnumerable<UserExamToListDto>> (userExams);
        //     return Ok (userExamToRetrun);

        // }

    }
}