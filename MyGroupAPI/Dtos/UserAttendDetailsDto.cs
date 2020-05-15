using System;

namespace MyGroupAPI.Dtos
{
    public class UserAttendDetailsDto
    {
        public string AttendSituation { get; set; }
        public DateTime AttendDate { get; set; }
        public string ReasonOfAbsence { get; set; }
        public string Notes { get; set; }  
        public string UserClassName { get; set; }  
        public string ArabicName { get; set; }
        public string GuardianName { get; set; }
        public string UserGroupName { get; set; }

        public UserAttendDetailsDto()
        {
            this.AttendDate = DateTime.Now;
        }
    }
}