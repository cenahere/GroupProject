import { User } from './user';

export interface UserCountry {
    userCountryId? : number;
    userCountryName? : string;
    users? : User[];
}
