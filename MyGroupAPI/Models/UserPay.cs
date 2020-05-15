using System;
using System.Collections.Generic;

namespace MyGroupAPI.Models {
    public class UserPay {
        public int UserPayId { get; set; }
        public DateTime PayDate { get; set; }
        public string AttendSituation { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        public double PriceWithDescount { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }
        
        public UserPay () {
            this.PayDate = DateTime.Now;
            this.PriceWithDescount = this.Price - this.PriceWithDescount;

        }
    }
}