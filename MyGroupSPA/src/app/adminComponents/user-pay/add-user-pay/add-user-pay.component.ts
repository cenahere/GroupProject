import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserPay } from 'src/app/_models/user-pay';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-user-pay',
  templateUrl: './add-user-pay.component.html',
  styleUrls: ['./add-user-pay.component.css']
})
export class AddUserPayComponent implements OnInit {

  userPay:UserPay ;
  user:User;
  model:any = {};
  
  paySitiuation=[
    {value:'سداد' , display : 'سداد'},
    {value:' معفي' , display : 'معفي '},
    {value:'دفع بخضم', display:'دفع بخضم  '},
  ];

  @Output() addUserPayy = new EventEmitter();
  constructor(private adminService:AdminService, private alertifyService:AlertifyService ,public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  addUserPay(){
    this.adminService.addUserPay(this.model , this.user.id).subscribe(
      res=>{
        this.alertifyService.success("تم الدفع");
        this.addUserPayy.emit(this.model);
        this.bsModalRef.hide();
      }
    )
  }


}
