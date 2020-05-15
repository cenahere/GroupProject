import { User } from './user';

export interface UserPay {
    userPayId?:number;
    payDate?:Date;
    attendSituation?:string;
    price?:number;
    discount?:number;
    priceWithDescount?:number;
    user?:User;
    userId?:number;
    arabicName?:string;
    guardianName?:string;
    userGroupName?:string;
    userClassName?:string;
}
