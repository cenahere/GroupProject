import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { Payment } from 'src/app/_models/payment';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-payment-users',
  templateUrl: './payment-users.component.html',
  styleUrls: ['./payment-users.component.css']
})
export class PaymentUsersComponent implements OnInit {

  payments:Payment[]
  constructor(private adminService:AdminService,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(){
    return this.adminService.getAllPayments().subscribe(
      (payments:Payment[])=>{this.payments=payments},
      error=>{this.alertifyService.error(error)}
    )
  }


}
