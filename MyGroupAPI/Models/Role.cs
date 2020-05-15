
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace MyGroupAPI.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRoles> UserRoles { get; set; }
    }
}