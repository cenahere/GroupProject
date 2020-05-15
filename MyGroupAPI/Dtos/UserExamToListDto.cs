using System;

namespace MyGroupAPI.Dtos
{
    public class UserExamToListDto
    {
        public string ExamTitle { get; set; }
        public DateTime ExamDate { get; set; }
        public double Result { get; set; }
        public double FinalResult { get; set; } = 100;
        // التقييم
        public string Evaluation { get; set; }
        public string Notes { get; set; }
        public string ArabicName { get; set; }
        public string GuardianName { get; set; }
        public string UserClassName { get; set; }  
        public string UserGroupName { get; set; }


        
    }
}