import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserClass } from 'src/app/_models/user-class';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-update-user-class',
  templateUrl: './update-user-class.component.html',
  styleUrls: ['./update-user-class.component.css']
})
export class UpdateUserClassComponent implements OnInit {

  userClass:UserClass;
  @Output() updateThisClass = new EventEmitter();
  
  constructor(private adminService:AdminService ,public bsModalRef:BsModalRef , private alertifyService:AlertifyService) { }

  ngOnInit(): void {
  }

  updateUserClass(userClass:UserClass){
    return this.adminService.updateUserClass(this.userClass.userClassId, this.userClass).subscribe(
      ()=>{
        this.alertifyService.success("تم تعديل الفصل الدراسي");
        this.updateThisClass.emit(userClass);
        this.bsModalRef.hide();
      }
    )
  }

 
}
