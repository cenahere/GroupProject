using System;
using System.ComponentModel.DataAnnotations;

namespace MyGroupAPI.Dtos
{
    public class UserExamToCreateDto
    {

        
        public string ExamTitle { get; set; }
        public DateTime ExamDate { get; set; }
        [Range(0,100, ErrorMessage = "درجة الاختبار لابد ان تكون من صفر الي مائه")]
        public double Result { get; set; } 

        public double FinalResult { get; set; } = 100;
        // التقييم
        public string Evaluation { get; set; }
        public string Notes { get; set; }


        public UserExamToCreateDto ( ) {
            this.ExamDate = DateTime.Now;   
            
        }
    }
}