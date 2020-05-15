import { User } from './user';
import { UserGroup } from './user-groups';

export interface UserClass {
    userClassId?:number;
    userClassName?:string;
    notes?:string;
    users?:User[];
    userGroups?:UserGroup[]
    userGroupName:string;
}
