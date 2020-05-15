import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserPay } from 'src/app/_models/user-pay';
import { AdminService } from 'src/app/_services/admin.service';
import { BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-user-pay-to-update',
  templateUrl: './user-pay-to-update.component.html',
  styleUrls: ['./user-pay-to-update.component.css']
})
export class UserPayToUpdateComponent implements OnInit {

  @Output() updateUserPay = new EventEmitter();
  userPay:UserPay;
  model :any = {}

  paySitiuation=[
    {value:'سداد' , display : 'سداد'},
    {value:' معفي' , display : 'معفي '},
    {value:'دفع بخضم', display:'دفع بخضم  '},
  ];

  constructor(private adminService:AdminService,public bsModalRef:BsModalRef  ,private alertifyService:AlertifyService) { }
  ngOnInit(): void {
  }

  updateUserPayy(userPay:UserPay){
    this.adminService.updateUserPay(userPay,this.userPay.userId , this.userPay.userPayId ).subscribe(
      res=>{
        this.alertifyService.success("تم تعديل الدفع");
        this.updateUserPay.emit(userPay);
        this.bsModalRef.hide();
      }
    )
  }


}
