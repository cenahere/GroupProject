import { UserClass } from './user-class';
import { UserAttend } from './user-attend';
import { UserGroup } from './user-groups';
import { Photo } from './photo';
import { UserExam } from './user-exam';

export interface UserToAdmin {
    
    id?: number;
    userName?: string;
    password?: string;
    arabicName?: string;
    gender?: string;
    lastActive?: Date;
    created: Date;
    dateOfBirth: Date;
    userPhone: string;
    guardianName?: string;
    guardianPhone: string;
    aboutMe: string;
    photoUrl: string;
    photos: Photo[];
    userClass?:UserClass;
    userClassId:number; 
    userVillageId:number;
    userCityId:number;
    userGovernorateId:number;
    userCountryId:number;
    userVillageName:string;
    userCityName :string;
    userGovernorateName :string;
    userCountryName? :string;
    userClassName ?:string;
    userGroupId:number;
    userGroups:UserGroup[];
    userGroupName?:string;
    roles?:string[];
    userAttends:UserAttend[];
    userExams:UserExam[];

}
