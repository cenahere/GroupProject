using System;

namespace MyGroupAPI.Dtos
{
    public class PaymentForReturnDto
    {
        public DateTime PaymentDate {get; set;}
        public double Amount { get; set; } 
        public int UserId { get; set; } 
        public string ReceiptUrl { get; set; } 
        public string Description  { get; set; }
        public string Currency  { get; set; }
        public string UserName { get; set; }
    }
}