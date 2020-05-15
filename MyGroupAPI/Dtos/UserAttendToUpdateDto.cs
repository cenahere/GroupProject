using System;

namespace MyGroupAPI.Dtos
{
    public class UserAttendToUpdateDto
    {
        public string AttendSituation { get; set; }
        public DateTime AttendDate { get; set; }
        public string ReasonOfAbsence { get; set; }
        public string Notes { get; set; }    

        public UserAttendToUpdateDto()
        {
            this.AttendDate = DateTime.Now;
        }
    }
}