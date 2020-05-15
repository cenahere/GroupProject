import { UserClass } from './user-class';
import { User } from './user';

export interface UserGroup {
    userGroupId?:number;
    userGroupName?:string;
    notes? :string;

    userClass?:UserClass;
    userClassId? :number;
    users?:User[];
}
