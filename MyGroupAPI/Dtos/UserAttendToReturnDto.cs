using System;

namespace MyGroupAPI.Dtos
{
    public class UserAttendToReturnDto
    {
        public string AttendSituation { get; set; }
        public DateTime AttendDate { get; set; }
        public string ReasonOfAbsence { get; set; }
        public string Notes { get; set; }    

        public UserAttendToReturnDto()
        {
            this.AttendDate = DateTime.Now;
        }

        public string UserClassName { get; set; }  
        public string ArabicName { get; set; }
        public string GuardianName { get; set; }
        public string UserGroupName { get; set; }
        
    }
}