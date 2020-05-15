import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AdminService } from 'src/app/_services/admin.service';
import { UserCity } from 'src/app/_models/user-City';
import { UserClass } from 'src/app/_models/user-class';
import { UserVillage } from 'src/app/_models/user-village';
import { UserGovernorate } from 'src/app/_models/user-governorate';
import { UserCountry } from 'src/app/_models/user-country';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user:User;
  @ViewChild('editForm') editForm:NgForm
  photoUrl:string;





  @HostListener('window:beforeunload',['$event'])
  unLoadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }
  }
  constructor(private route:ActivatedRoute, public adminService:AdminService,private authService:AuthService,private userService:UserService,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.user=data['user']
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl=>{this.photoUrl=photoUrl});


  }

  updateUser(){
    return this.userService.updateUser(this.authService.decodedToken.nameid , this.user).subscribe(
      ()=>{
        this.alertifyService.success("تم التعديل");
        this.editForm.reset(this.user);
      },
      error=>{this.alertifyService.error(error)}
    )
    
  }
  updateMainPhoto(photoUrl){
    this.user.photoUrl=photoUrl;
  }




 


}
