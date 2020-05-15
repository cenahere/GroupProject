using System.Collections.Generic;

namespace MyGroupAPI.Models
{
    public class UserGovernorate
    {
        public int  UserGovernorateId { get; set; }
        public string UserGovernorateName { get; set; }

        public IEnumerable<User> Users { get; set; }

    }
}