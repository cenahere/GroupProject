
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace MyGroupAPI.Models
{
    
    public class UserClass
    {
        public int UserClassId  { get; set; }
        public string UserClassName { get; set; }
        public string Notes { get; set; }
        

        public IEnumerable<User> Users { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }



    }
}

