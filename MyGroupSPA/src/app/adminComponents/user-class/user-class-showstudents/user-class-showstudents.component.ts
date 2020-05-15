import { Component, OnInit } from '@angular/core';
import { UserClass } from 'src/app/_models/user-class';
import { AdminService } from 'src/app/_services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-user-class-showstudents',
  templateUrl: './user-class-showstudents.component.html',
  styleUrls: ['./user-class-showstudents.component.css']
})
export class UserClassShowstudentsComponent implements OnInit {
  userClass:UserClass;
  term:string;
  p:number = 1;
  constructor(private adminService:AdminService , private route:ActivatedRoute , private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data=>{this.userClass=data['userclass']}
    )
    // this.getUserClass();
  
  }

  // getUserClass(){
  //   this.adminService.getUserClass(+this.route.snapshot.params.userClassId).subscribe(
  //     (userClass:UserClass)=>{this.userClass=userClass},
  //     error=>{this.alertifyService.error(error)}
  //   )
  // }


}
