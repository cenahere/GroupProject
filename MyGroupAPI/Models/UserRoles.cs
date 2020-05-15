using Microsoft.AspNetCore.Identity;

namespace MyGroupAPI.Models
{
    public class UserRoles : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}