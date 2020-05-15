using System;
using System.Collections.Generic;

namespace MyGroupAPI.Models {
    public class UserExam {
        public int UserExamId { get; set; }
        public string ExamTitle { get; set; }
        public DateTime ExamDate { get; set; }
        public double Result { get; set; }
        public double FinalResult { get; set; }
        // التقييم
        public string Evaluation { get; set; }
        public string Notes { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }

        
    }
}