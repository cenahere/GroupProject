import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  JwtHelper = new JwtHelperService();
  decodedToken:any;
  currentUser:User;
  photoUrl = new BehaviorSubject<string>('../../assets/userPic.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  paid:boolean=false;

  unReadCount = new BehaviorSubject<string>('');
  latestUnreadCount=this.unReadCount.asObservable();

  HubConnection :HubConnection=new HubConnectionBuilder().withUrl("http://localhost:5000/chat").build();

  constructor(private http:HttpClient) { }
  login(model:any){
    return this.http.post(environment.baseUrl + 'auth/login' , model).pipe(
      map((response:any)=>{
        const user = response;
        if(user) {localStorage.setItem('token',user.token)};

        localStorage.setItem('user',JSON.stringify(user.user));
        this.currentUser=user.user;
        console.log(user)

        this.decodedToken=this.JwtHelper.decodeToken(user.token);
        console.log(this.decodedToken);

        this.changeMemberPhoto(this.currentUser.photoUrl);
      })
    )
  }



  register(user:any){
    return this.http.post(environment.baseUrl + 'auth/register' ,user);
  }

  loggedIn(){
    try {
      const token = localStorage.getItem('token');
      return !this.JwtHelper.isTokenExpired(token);
    } catch{
      return false;
    }
  }
  changeMemberPhoto(newPhotoUrl : string){
    this.photoUrl.next(newPhotoUrl);
  }

  roleMatch(AllowRoles):boolean{
    let isMatch=false;
    const userRoles=this.decodedToken.role as Array<string>;
    AllowRoles.forEach(element=>{
      if(userRoles.includes(element)){
        isMatch=true;
        return;
      }
    });
    return isMatch;
  }

}
