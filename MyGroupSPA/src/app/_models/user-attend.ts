import { User } from './user';

export interface UserAttend {
    userAttendId?:number;
    attendSituation?:string;
    attendDate?:Date;
    reasonOfAbsence?:string;
    notes?:string;
    user?:User;
    userId?:number;
    arabicName?:string;
    guardianName?:string;
    userGroupName?:string;
    userClassName?:string;

}
