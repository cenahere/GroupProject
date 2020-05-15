using System;

namespace MyGroupAPI.Dtos
{
    public class UserAttendToCreateDto
    {
        public string AttendSituation { get; set; }
        public DateTime AttendDate { get; set; }
        public string ReasonOfAbsence { get; set; }
        public string Notes { get; set; }    

        public UserAttendToCreateDto()
        {
            this.AttendDate = DateTime.Now;
        }
    }
}