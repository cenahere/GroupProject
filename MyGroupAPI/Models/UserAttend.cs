using System;
using System.Collections.Generic;

namespace MyGroupAPI.Models
{
    public class UserAttend
    {
        public int UserAttendId { get; set; }
        public string AttendSituation { get; set; }
        public DateTime AttendDate { get; set; }
        public string ReasonOfAbsence { get; set; }
        public string Notes { get; set; }


        public User User { get; set; }
        public int UserId { get; set; }

       

        public UserAttend()
        {
            this.AttendDate = DateTime.Now;
        }

    }
}