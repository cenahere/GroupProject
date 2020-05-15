using System.Collections.Generic;

namespace MyGroupAPI.Models
{
    public class UserCountry
    {
        public int UserCountryId { get; set; }
        public string UserCountryName { get; set; }
        public IEnumerable<User> Users { get; set; }

    }
}