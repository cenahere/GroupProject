import { ClassGroups } from './class-groups';

export interface Group {
    groupId:number;
    groupName:string;
    notes:string;
    classGroups:ClassGroups;
}
