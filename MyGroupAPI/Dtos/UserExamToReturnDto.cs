using System;

namespace MyGroupAPI.Dtos
{
    public class UserExamToReturnDto
    {
                public string ExamTitle { get; set; }
        public DateTime ExamDate { get; set; }
        public double Result { get; set; }
        public double FinalResult { get; set; }
        // التقييم
        public string Evaluation { get; set; }
        public string Notes { get; set; }

 

        public UserExamToReturnDto () {
            this.ExamDate = DateTime.Now;
        }
    }
}