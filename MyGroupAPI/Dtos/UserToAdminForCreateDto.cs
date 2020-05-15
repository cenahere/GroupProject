using System.Collections.Generic;
using MyGroupAPI.Models;

namespace MyGroupAPI.Dtos
{
    public class UserToAdminForCreateDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ArabicName { get; set; }
        public string Gender { get; set; } 
        public string UserPhone { get; set; }
        public string GuardianName { get; set; }
        public string GuardianPhone { get; set;}
        public int UserVillageId { get; set; }
        public int UserCityId { get; set; }
       public int UserGovernorateId { get; set; }
        public int UserCountryId { get; set; }
       public int UserClassId { get; set; }
       public int UserGroupId { get; set; }
    }

}