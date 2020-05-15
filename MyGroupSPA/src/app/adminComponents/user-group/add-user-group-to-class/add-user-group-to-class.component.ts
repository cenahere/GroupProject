import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserGroup } from 'src/app/_models/user-groups';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalRef } from 'ngx-bootstrap';
import { UserClass } from 'src/app/_models/user-class';

@Component({
  selector: 'app-add-user-group-to-class',
  templateUrl: './add-user-group-to-class.component.html',
  styleUrls: ['./add-user-group-to-class.component.css']
})
export class AddUserGroupToClassComponent implements OnInit {

  userGroup:UserGroup;
  userClass:UserClass;
  model:any={}
  @Output() addGroupToClasss = new EventEmitter();

  constructor(private adminService:AdminService  , private alertifyService:AlertifyService  , public bsModalRef:BsModalRef) { }

  ngOnInit(): void {
  }

  addGroupToClass(){
    this.adminService.addGroupToClass(this.model , this.userClass.userClassId).subscribe(
      res=>{
        this.alertifyService.success("تم الاضافة");
        this.addGroupToClasss.emit(this.model);
        this.bsModalRef.hide();
      }
    )
  }

}
