using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace MyGroupAPI.Models {
    public class User : IdentityUser<int> {
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
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesRecived { get; set; }
        public ICollection<UserRoles> UserRoles { get; set; }

        // Admin Panel Relationships

        public int UserClassId { get; set; }
        public UserClass UserClass { get; set; }
        public int UserGroupId { get; set; } 
        public UserGroup UserGroup {get;set;}
       public ICollection<UserAttend> UserAttends { get; set; }
        public ICollection<UserPay> UserPays { get; set; }
        public ICollection<UserExam> UserExams { get; set; }
        // UserAddress
        public int UserVillageId { get; set; }
        public UserVillage UserVillage { get; set; }
        public int UserCityId { get; set; }
        public UserCity UserCity { get; set; }
        public int UserGovernorateId { get; set; }
        public UserGovernorate UserGovernorate { get; set; }
        public int UserCountryId { get; set; }
        public UserCountry UserCountry { get; set; }



    }
}