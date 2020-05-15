using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyGroupAPI.Models;

namespace MyGroupAPI.Data {
    public class AuthRepository : IAuthRepository {
        private readonly DataContext _context;
        public AuthRepository (DataContext context) {
            _context = context;

        }
        public async Task<User> Login (string userName, string password) {
            var user = await _context.Users.Include(x=>x.Photos).FirstOrDefaultAsync(u=>u.UserName==userName);
            if(user == null) return null;
            return user;
        }


        public async Task<User> Register (User user, string password) {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UserExists (string userName) {
            if(await _context.Users.AnyAsync(u=>u.UserName==userName)) return true;
            return false;
        }


    }
}