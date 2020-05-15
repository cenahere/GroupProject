import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserClass } from '../_models/user-class';
import { NgForm } from '@angular/forms';
import { UserCity } from '../_models/user-City';
import { UserVillage } from '../_models/user-village';
import { UserGovernorate } from '../_models/user-governorate';
import { UserCountry } from '../_models/user-country';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { UserAttend } from '../_models/user-attend';
import { UserExam } from '../_models/user-exam';
import { UserPay } from '../_models/user-pay';

@Injectable({
  providedIn: 'root'
})


export class AdminService {
  selectedCity:UserCity;
  cities:UserCity[];
  selectedVillage:UserVillage;
  selectedGovernorate:UserGovernorate;
  selectCountry:UserCountry;

  constructor(private http:HttpClient) { }


  getAllPayments(){
    return this.http.get(environment.baseUrl + 'admin/payment');   
  }

  // UserCity
  getCities(){
    return this.http.get(environment.baseUrl + 'userCity');
  }
  getCity(cityId:any){
    return this.http.get(environment.baseUrl +  'userCity/' + cityId )
  }
  insertCity(city:UserCity){
    return this.http.post(environment.baseUrl + 'userCity'  ,city)
  }
  updateCity(city:UserCity){
    return this.http.put(environment.baseUrl + 'userCity/' + city.userCityId , city);
  }
  deleteCity(userCityId:any){
    return this.http.delete(environment.baseUrl +'userCity/' + userCityId);
  }

  // UserVillage
  getUserVillages(){
    return this.http.get(environment.baseUrl + 'userVillage')
  }
  getUserVillageId(userVillageId:any){
    return this.http.get(environment.baseUrl + "userVillage/" + userVillageId);
  }
  insertUserVillage(userVillage:UserVillage){
    return this.http.post(environment.baseUrl + 'userVillage/'  , userVillage);
  }
  updateUserVillage(userVillage:UserVillage){
    return this.http.put(environment.baseUrl + "userVillage/" + userVillage.userVillageId , userVillage);
  }
  deleteUserVillage(userVillageId:any){
    return this.http.delete(environment.baseUrl + "userVillage/" + userVillageId);
  }
// userGovernorate
getUserGovernorates(){
  return this.http.get(environment.baseUrl + "userGovernorate");
}
getUserGovernorate(userGovernorateId:any){
  return this.http.get(environment.baseUrl +'userGovernorate/' + userGovernorateId);
}
insertUserGovernorate(userGovernorate:UserGovernorate){
  return this.http.post(environment.baseUrl + 'userGovernorate/'  , userGovernorate);
}
updateUserGovernorate(userGovernorate:UserGovernorate){
  return this.http.put(environment.baseUrl + "userGovernorate/" + userGovernorate.userGovernorateId , userGovernorate)
}
deleteUserGovrnorate(userGovernorateId:any){
  return this.http.delete(environment.baseUrl + 'userGovernorate/' + userGovernorateId)
}
//UserCountry
getUserCountries(){
  return this.http.get(environment.baseUrl + "userCountry");
}
getUserCountry(userCountryId:any){
  return this.http.get(environment.baseUrl + "userCountry/" + userCountryId);
}
insertUserCountry(userCountry:UserCountry){
  return this.http.post(environment.baseUrl + 'userCountry/' , userCountry);
}
updateUserCountry(userCountry:UserCountry){
  return this.http.put(environment.baseUrl + "userCountry/" + userCountry.userCountryId , userCountry);
}
deleteUserCounty(userCountryId:any){
  return this.http.delete(environment.baseUrl + "userCountry/" + userCountryId);
}
  // userClass 
getUsersClasses(){
  return this.http.get(environment.baseUrl + "userClass");
}
getUserClass(userClassId:any){
  return this.http.get(environment.baseUrl + "userClass/" + userClassId);
}
insertUserClass(userClass:UserClass){
  return this.http.post(environment.baseUrl + "userClass" , userClass);
}
updateUserClass(userClassId:any, userClass:UserClass){
  return this.http.put(environment.baseUrl + "userClass/" + userClass.userClassId , userClass);
}

deleteUserClass(userClass:UserClass){
  return this.http.delete(environment.baseUrl + "userClass/" + userClass.userClassId)
}



getUsersToAdmin(page?,itemsPerPage?,adminParams?):Observable<PaginationResult<User[]>>{
  // معلومات الصفحة
  const paginationResult:PaginationResult<User[]> = new PaginationResult<User[]>();
  // يراجع المرسل سواء page or ItemsPerPage
  let params = new HttpParams();
  // لو القيم فارغة يمرر القيم الاولي واحد وستة
  if(page != null && itemsPerPage != null){
    params = params.append('pageNumber',page);
    params = params.append('pageSize',itemsPerPage);
  }

  if(adminParams != null){

    params = params.append('gender' , adminParams.gender);
    params = params.append('userClassName' , adminParams.userClassName)
    params = params.append('userGroupName' , adminParams.userGroupName)

  }


  return this.http.get<User[]>(environment.baseUrl + "userToAdmin" , {observe:'response' ,params}).pipe(
    // يراجع الحالية الاولي والماب هو موظف يحدد القائمة اللي جاية ويعود بيهم 
    map(response=>{
      // يعود بيهم في ال body
      paginationResult.result=response.body;
      // يشوف لو فيه في ال get pagiation 
      if(response.headers.get('Pagination') != null){
        // ونضيفة للهيدرز وهو راجع في شكل نصي استرينج فنحوله الي اوبجكت
        paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
      }
      return paginationResult;
    })
  );
}


// getUserToAdmin
getUserToAdmin(userId:any){
  return this.http.get(environment.baseUrl + 'userToAdmin/' + userId)
}



// addUserToAdmin 
userToAdminCreate(userToAdmin:any){ 
  return this.http.post(environment.baseUrl + 'userToAdmin/addUser' ,userToAdmin);
}
// updateUserToAdmin
updateUserToAdmin(id:any , user:User){
  return this.http.put(environment.baseUrl + "userToAdmin/" + user.id , user); 
}
// changeRole
changeUserRole(id:any , roleId:any){
  return this.http.post(environment.baseUrl + 'admin/user/' + id + 'role/' + roleId , {});
}
// getGroups
getUserGroups(){
  return this.http.get(environment.baseUrl + 'userclass/usergroup')
}
getUserGroup(userGroupId:number){
  return this.http.get(environment.baseUrl + "userClass/userGroup/" + userGroupId)
}

addGroupToClass(model:any , id:any){
  return this.http.post(environment.baseUrl + 'userClass/' + id + '/userGroup',model );
}

deleteUserGroup(userAttendId:any){
  return this.http.delete(environment.baseUrl + "userAttend/" + userAttendId)
}
// // AddUserAttend 
addUserAttend( model:any , id:any){
  return this.http.post(environment.baseUrl + "userToAdmin/" + id +'/userAttend',model);
}

deleteUserAttendFromAdmin(userAttend:UserAttend){
  return this.http.delete(environment.baseUrl + "userToAdmin/" + userAttend.userId + "/userAttend/" + userAttend.userAttendId)
}
updateUserAttend(userAttend:UserAttend , userId:any , userAttendId:any){
  return this.http.put(environment.baseUrl+"userToAdmin/" + userId + '/userAttend/' + userAttendId , userAttend );
}


// userExam
addUserExam(model:any , id:any){
  return this.http.post(environment.baseUrl + 'userToAdmin/' + id +'/userExam', model);
}
deleteUserExamFromAdmin(userExam:UserExam){
  return this.http.delete(environment.baseUrl + "userToAdmin/" + userExam.userId + "/userExam/" + userExam.userExamId)
}
updateUserExam(userExam:UserExam , userId:any , userExamId:any){
  return this.http.put(environment.baseUrl+"userToAdmin/" + userId + '/userExam/' + userExamId , userExam );
}
// userPay
addUserPay(model:any,  id:any){
  return this.http.post(environment.baseUrl + 'userToAdmin/' + id + '/userPay', model);
}
deleteUserPayFromAdmin(userPay:UserPay){
  return this.http.delete(environment.baseUrl + "userToAdmin/" + userPay.userId + "/userPay/" + userPay.userPayId)
}
updateUserPay(userPay:UserPay , userId:any , userPayId:any){
  return this.http.put(environment.baseUrl+"userToAdmin/" + userId + '/userPay/' + userPayId , userPay );
}

//getUserwithRoles
getUserWithRoles(){
  return this.http.get(environment.baseUrl + 'usertoadmin/userWithRoles')
}

updateEditRoles(user:User,roles:{}){
  return this.http.post(environment.baseUrl +'usertoadmin/' +'editroles/'+ user.userName , roles, {})
}


}
