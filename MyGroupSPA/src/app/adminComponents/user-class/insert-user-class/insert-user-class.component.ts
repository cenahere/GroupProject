import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AdminService } from 'src/app/_services/admin.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-insert-user-class',
  templateUrl: './insert-user-class.component.html',
  styleUrls: ['./insert-user-class.component.css']
})
export class InsertUserClassComponent implements OnInit {


  @Output() insertNewUserClass = new EventEmitter();
  model :any = {}

  constructor(public bsModalRef: BsModalRef , private adminService:AdminService, private alertifyService:AlertifyService)   { }

  ngOnInit(): void {
  }
  
  insertUserClass(insertForm:NgForm){
    this.adminService.insertUserClass(insertForm.value).subscribe(
      res=>{
        this.alertifyService.success("تم اضافة الفصل الدراسي");
        this.insertNewUserClass.emit(insertForm.value);
        this.bsModalRef.hide();
      }
    )
  }

}
