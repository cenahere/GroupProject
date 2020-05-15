using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyGroupAPI.Data;
using MyGroupAPI.Dtos;
using MyGroupAPI.Models;

namespace MyGroupAPI.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly DataContext _context;
        public AuthController(IConfiguration config, DataContext context, IAuthRepository repo, UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
        {
            _context = context;
            _config = config;
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

          bool userAlreadyExists = _context.User.Any(x => x.UserName == userToCreate.UserName);
            if (userAlreadyExists)
            {
                return BadRequest("هذا العضو موجود من قبل");
            }

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);
            //
            var userToReturn = _mapper.Map<UserForRegisterDto, User>(userForRegisterDto, userToCreate);
            if (result.Succeeded)
            {
                return CreatedAtRoute("GetUser", new { controller = "User", id = userToCreate.Id }, userToReturn);
            }
            return BadRequest(result.Errors);
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim> {
                new Claim (ClaimTypes.NameIdentifier, user.Id.ToString ()),
                new Claim (ClaimTypes.Name, user.UserName)
            };
        
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(5),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.UserName);
            var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);
            if (result.Succeeded)
            {
                var appUser = await _userManager.Users.Include(x => x.Photos).FirstOrDefaultAsync(
                    u => u.NormalizedUserName == userForLoginDto.UserName.ToUpper()
                );
                var userToReturn = _mapper.Map<UserForListDto>(appUser);
                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }
            return Unauthorized();
        }



    }
}