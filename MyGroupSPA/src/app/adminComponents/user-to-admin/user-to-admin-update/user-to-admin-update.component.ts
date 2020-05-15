import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { UserToAdmin } from 'src/app/_models/user-to-admin';
import { BsModalRef } from 'ngx-bootstrap';
import { UserClass } from 'src/app/_models/user-class';
import { User } from 'src/app/_models/user';
import { UserGroup } from 'src/app/_models/user-groups';

@Component({
  selector: 'app-user-to-admin-update',
  templateUrl: './user-to-admin-update.component.html',
  styleUrls: ['./user-to-admin-update.component.css']
})
export class UserToAdminUpdateComponent implements OnInit {
  userGroups:UserGroup[]
  user:User;

  @Output() updateUserByAdminn = new EventEmitter();

  userClass: UserClass[];

  citySelected: string;

  constructor(private adminService:AdminService ,public bsModalRef:BsModalRef , private alertifyService:AlertifyService) { }
  ngOnInit(): void {

    this.getUserClasses();
    this.getUserGroup();

  }

  getUserGroup(){
    return this.adminService.getUserGroups().subscribe(
      (userGroups:UserGroup[])=>{this.userGroups=userGroups}

    )
  }

  updateUserByAdmin(user:User){
    return this.adminService.updateUserToAdmin(this.user.id, this.user).subscribe(
      ()=>{
        this.alertifyService.success("تم تعديل العضو ");
        this.updateUserByAdminn.emit(user);
        this.bsModalRef.hide();

      }
    )
  }


  onCitySelected(val: any) {
    this.citySelected = val;
  }

 

  getUserClasses() {
    return this.adminService.getUsersClasses().subscribe(
      (userClass: UserClass[]) => this.userClass = userClass,
      error => this.alertifyService.error(error)
    )
  }

 

}
