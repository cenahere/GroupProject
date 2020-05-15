import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  photoUrl:string;

  count:string;

  hubConnection:HubConnection;

  constructor(private userService:UserService,public authService:AuthService , private alertify:AlertifyService ,private router:Router) { }

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(
        photoUrl=>{this.photoUrl=photoUrl}
    )

    this.userService.getUnreadCount(this.authService.decodedToken.nameid).subscribe(
      res=>{
        this.authService.unReadCount.next(res.toString());
        this.authService.latestUnreadCount.subscribe(
          res=>{
            this.count=res;
          }
        )
      }
    )

    this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/chat").build();
    this.hubConnection.start();
    this.hubConnection.on('count',()=>{
      setTimeout(() => {
        this.userService.getUnreadCount(this.authService.decodedToken.nameid).subscribe(
          res=>{
            this.authService.unReadCount.next(res.toString());
            this.authService.latestUnreadCount.subscribe(
              res=>{
                this.count=res
              }
            )
          }
        )
      }, 3,0);
    })

    
  }

  login(){
    this.authService.login(this.model).subscribe(
      next=>{this.alertify.success('تم الدخول بنجاح')
    
      this.userService.getUnreadCount(this.authService.decodedToken.nameid).subscribe(res=>{
        this.authService.unReadCount.next(res.toString());
        this.authService.latestUnreadCount.subscribe(res=>{this.count=res;});
             });         

    
    },
      error=>{this.alertify.error('فشل في عملية الدخول')},
      ()=>{this.router.navigate(['/members'])}
    )
  }

  loggedIn(){
    return this.authService.loggedIn();
  }
  loggedOut(){
    localStorage.removeItem('token');

    this.authService.decodedToken=null;
    localStorage.removeItem('user');
    this.authService.currentUser=null;

    this.router.navigate(['/home'])
  }
  

}
