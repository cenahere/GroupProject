using System;
using System.Collections.Generic;
using MyGroupAPI.Models;

namespace MyGroupAPI.Dtos
{
    public class UserToAdminForDetailsDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ArabicName { get; set; }
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


        public ICollection<PhotoForDetailsDto> Photos { get; set; }
        public ICollection<UserAttend> UserAttends { get; set; }
        public ICollection<UserPay> UserPays { get; set; }
        public ICollection<UserExam> UserExams { get; set; }

    }
}