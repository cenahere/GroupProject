import { User } from './user';

export interface UserVillage {
    userVillageId? : number;
    userVillageName? : string;
    users?:User[];
}
