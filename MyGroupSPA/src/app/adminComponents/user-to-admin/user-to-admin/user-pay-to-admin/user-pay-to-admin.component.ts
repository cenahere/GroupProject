import { Component, OnInit, Input } from '@angular/core';
import { UserPay } from 'src/app/_models/user-pay';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserPayToUpdateComponent } from '../user-pay-to-update/user-pay-to-update.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-pay-to-admin',
  templateUrl: './user-pay-to-admin.component.html',
  styleUrls: ['./user-pay-to-admin.component.css']
})
export class UserPayToAdminComponent implements OnInit {
  @Input() userPays:UserPay[]

 term:string;
  p:number=1;

  bsModalRef:BsModalRef;
  constructor(private adminService:AdminService,private modalService: BsModalService , private alertifyService:AlertifyService) { }

  ngOnInit(): void {
  }
  deletePay(userPay:UserPay){
    this.alertifyService.confirm("هل تريد حذف هذا الدفع",()=>{
      this.adminService.deleteUserPayFromAdmin(userPay).subscribe(
        ()=>{},
        (error)=>{
          this.userPays.splice(this.userPays.findIndex(u=>u.userPayId==userPay.userPayId),1);
          this.alertifyService.success("تم الحذف");
        }
      )
    })
  }
  updateUserPay(userPay:UserPay) {
    const initialState = {
      userPay

    };
    this.bsModalRef = this.modalService.show(UserPayToUpdateComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateUserPay.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        // this.getUserClasses();
        console.log(newValues)
      }
      )
    }




}
