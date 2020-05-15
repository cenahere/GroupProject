import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Payment } from '../_models/payment';
import { AlertifyService } from '../_services/alertify.service';
import { AdminService } from '../_services/admin.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PaymentUsersResolver implements Resolve<Payment[]> {
    constructor(private alertifyService:AlertifyService,private adminService:AdminService , private router:Router){}
    resolve(route:ActivatedRouteSnapshot):Observable<Payment[]>{
        return this.adminService.getAllPayments().pipe(
            catchError(error=>{
                this.alertifyService.error('يوجد مشكله في عرض بيانات الدفع');
                this.router.navigate(['/admin']);
                return of(null);
            })
        )
    }
}
