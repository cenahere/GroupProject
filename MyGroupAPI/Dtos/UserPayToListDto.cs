using System;
using MyGroupAPI.Models;

namespace MyGroupAPI.Dtos
{
    public class UserPayToListDto
    {
         public DateTime PayDate { get; set; }
        public string AttendSituation { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        public double PriceWithDescount { get; set; }
        public string ArabicName { get; set; }
        public string GuardianName { get; set; }
        public string UserGroupName { get; set; }
        public string UserClassName { get; set; }

        public int UserId { get; set; }
        
        public UserPayToListDto () {
            this.PayDate = DateTime.Now;
            this.PriceWithDescount = this.Price - this.PriceWithDescount;

        }
    }
}