using System.Collections.Generic;

namespace MyGroupAPI.Models
{
    public class UserVillage
    {
        public int UserVillageId { get; set; }
        public string UserVillageName { get; set; }

        public IEnumerable<User> Users { get; set; }

    }
}