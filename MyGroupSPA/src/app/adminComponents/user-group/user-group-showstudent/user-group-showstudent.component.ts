import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserGroup } from 'src/app/_models/user-groups';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UserAttend } from 'src/app/_models/user-attend';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-group-showstudent',
  templateUrl: './user-group-showstudent.component.html',
  styleUrls: ['./user-group-showstudent.component.css']
})
export class UserGroupShowstudentComponent implements OnInit {
  userGroup:UserGroup;
  term:string;
  p:number=1;
  bsModalRef: BsModalRef;
  userAttend:UserAttend;


  constructor(private adminService:AdminService ,private modalService: BsModalService, private route:ActivatedRoute,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data=>{this.userGroup=data['userGroup']}
    )
  }



  addUserAttend(user:User) {
    const initialState = {
      user
      // list: [
      //   'Open a modal with component',
      //   'Pass your data',
      //   'Do something else',
      //   '...'
      // ],
      // title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(UserGroupShowstudentComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.addUserAttendd.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        // this.getUserClasses();
        console.log(newValues);
      }
    )
  }
}
