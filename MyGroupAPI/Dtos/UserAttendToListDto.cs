using System;

namespace MyGroupAPI.Dtos
{
    public class UserAttendToListDto
    {
        public string AttendSituation { get; set; }
        public DateTime AttendDate { get; set; }
        public string ReasonOfAbsence { get; set; }
        public string Notes { get; set; }  
        public string UserClassName { get; set; }  
        public string ArabicName { get; set; }
        public string GuardianName { get; set; }
        public string UserGroupName { get; set; }

        public UserAttendToListDto()
        {
            this.AttendDate = DateTime.Now;
        }
    }
}
