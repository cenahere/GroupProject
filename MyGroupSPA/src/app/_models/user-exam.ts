import { User } from './user';

export interface UserExam {
    userExamId :number;
    examTitle :string;
   examDate :Date;
    result :number;
    finalResult :number;
    // التقييم
    evaluation :string;
    notes :string;

    user :User;
   userId :number;
   arabicName?:string;
   guardianName?:string;
   userGroupName?:string;
   userClassName?:string;
}
