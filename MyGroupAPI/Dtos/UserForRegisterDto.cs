using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MyGroupAPI.Models;

namespace MyGroupAPI.Dtos
{
    public class UserForRegisterDto
    {
        [Required]

        public string UserName { get; set; }
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="كلمة المرور لا تقل عن اربعة حروف ولا تزيد علي ثمانية احرف")]
        public string Password { get; set; }
        [Required]
        public string ArabicName { get; set; }

        [Required]
        public string Gender { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime Created { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string UserPhone { get; set; }
        [Required]
        public string GuardianName { get; set; }
        [Required] 
        public string GuardianPhone { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public int UserClassId { get; set; }
        public int UserVillageId { get; set; }
        public int UserCityId { get; set; }
        public int UserGovernorateId { get; set; }
        public int UserCountryId { get; set; }
        public int UserGroupId { get; set; }
                

        public UserForRegisterDto()
        {
            Created=DateTime.Now;
            LastActive=DateTime.Now;
        }
    }
}