using System.Collections.Generic;
using System.Threading.Tasks;
using MyGroupAPI.Models;

namespace MyGroupAPI.Data
{
    public interface IAuthRepository
    {
         Task<User> Login(string userName, string password);
         Task<User> Register(User user , string password);
         Task<bool> UserExists(string userName);
     
         
    }
}