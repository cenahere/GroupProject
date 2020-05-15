import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { PaginationResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  


  constructor(private http:HttpClient) { }


    // نمرر لة فيه page or itemsPerPage
    getUsers(page?,itemsPerPage?,userParams?):Observable<PaginationResult<User[]>>{
      // معلومات الصفحة
      const paginationResult:PaginationResult<User[]> = new PaginationResult<User[]>();
      // يراجع المرسل سواء page or ItemsPerPage
      let params = new HttpParams();
      // لو القيم فارغة يمرر القيم الاولي واحد وستة
      if(page != null && itemsPerPage != null){
        params = params.append('pageNumber',page);
        params = params.append('pageSize',itemsPerPage);
      }

      if(userParams != null){

        params = params.append('gender' , userParams.gender);
        params = params.append('orderBy' , userParams.orderBy);
        params = params.append('userVillageName' , userParams.userVillageName)
        params = params.append('userClassName' , userParams.userClassName)
        params = params.append('userGroupName' , userParams.userGroupName)
 
      }


      return this.http.get<User[]>(environment.baseUrl + "user" , {observe:'response' ,params}).pipe(
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
  



  checkUserNameNotTaken(userName: string) {
    return this.http.get(environment.baseUrl + 'user').pipe(
        map(response=>{
          response => response.json().delay(1000)
          .map(users => users.filter(user => user.userName === userName))
          .map(users => !users.length);          
          }))
           
        }
       


  getUser(id:any):Observable<User>{
    return this.http.get<User>(environment.baseUrl + 'user/' + id)
  }
  updateUser(id:any , user:User){
    return this.http.put(environment.baseUrl + 'user/'+ id , user);
  }
  setMainPhoto(userId:number,id:number){
    return this.http.post(environment.baseUrl + 'user/' + userId + '/photo/' + id + '/setmain' , {});
  }

  deletePhoto(userId:number , id:number){
    return this.http.delete(environment.baseUrl + 'user/' + userId + '/photo/' + id)
   }

   getMessages(id: number, page?, itemPerPage?, messageType?) {
    const paginationResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();
  // متغير من ال  params
    let params = new HttpParams();
    // نوع الرسالة
    params = params.append('MessageType',messageType);
    // اضافة برمتر ال  pagination
    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
    }
    return this.http.get<Message[]>(environment.baseUrl + "user/"+ id +'/messages',{observe:'response',params}).pipe(
    // الداتا اللي راجعة من ال  api
        map(response=>{
      paginationResult.result=response.body;
      if(response.headers.get('Pagination')!==null){
      paginationResult.pagination=JSON.parse(response.headers.get('Pagination'));
     }
   return paginationResult;
    })
  );
  }

  getConverstion(id:number, recipientId:number){
    return this.http.get<Message[]>(environment.baseUrl + 'user/' + id + '/messages/chat/' + recipientId);
   }
   sendMessage(id:number,message:Message){
   return this.http.post(environment.baseUrl +'user/' + id + '/messages' , message);
   }

   getUnreadCount(userId){
    return this.http.get(environment.baseUrl + 'user/' + userId + '/messages/count');
  }


  markAsRead(userId:number , messageId:number){
    return this.http.post(environment.baseUrl + 'user/' +userId+'/messages/read/'+messageId,{}).subscribe();
  }

  deleteMessage(id:number,userId:number){
    return this.http.post(environment.baseUrl + 'user/' +userId+'/messages/'+id,{});
   }

   charge(userId:number,stripeToken:string){
    return this.http.post(environment.baseUrl + 'user/' + userId + '/charge/' + stripeToken , {});
  }
  
  
   
}
