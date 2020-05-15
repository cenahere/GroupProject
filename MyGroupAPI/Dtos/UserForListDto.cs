using System;
using System.Collections.Generic;
using System.Linq;
using MyGroupAPI.Models;

namespace MyGroupAPI.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ArabicName { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime Created { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string UserPhone { get; set; }
        public string GuardianName { get; set; }
        public string GuardianPhone { get; set; }
        public string AboutMe { get; set; }
        public string PhotoUrl { get; set; }
        public string UserVillageName { get; set; }
        public string UserCityName { get; set; }
        public string UserGovernorateName { get; set; }
        public string UserCountryName { get; set; }
        public string UserClassName { get; set; }
        public string UserGroupName { get; set; }

    }
}
