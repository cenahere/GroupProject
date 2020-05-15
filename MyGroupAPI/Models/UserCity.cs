using System.Collections.Generic;

namespace MyGroupAPI.Models
{
    public class UserCity
    {
        public int UserCityId { get; set; }
        public string UserCityName { get; set; }
        public IEnumerable<User> Users { get; set; }

    }
}