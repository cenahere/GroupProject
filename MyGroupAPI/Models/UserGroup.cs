using System.Collections.Generic;

namespace MyGroupAPI.Models
{
    public class UserGroup
    {
        public int UserGroupId { get; set; }
        public string UserGroupName { get; set; }
        public string Notes { get; set; }

        public UserClass UserClass { get; set; }
        public int UserClassId { get; set; }
        public IEnumerable<User> Users { get; set; }



    }
}