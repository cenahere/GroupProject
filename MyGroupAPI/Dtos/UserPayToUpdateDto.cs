using System;

namespace MyGroupAPI.Dtos
{
    public class UserPayToUpdateDto
    {
         public DateTime PayDate { get; set; }
        public string AttendSituation { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        public double PriceWithDescount { get; set; }

        
        public UserPayToUpdateDto () {
            this.PayDate = DateTime.Now;
            this.PriceWithDescount = this.Price - this.PriceWithDescount;

        }
    }
}