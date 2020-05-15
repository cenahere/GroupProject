import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserClass } from '../_models/user-class';
import { AdminService } from '../_services/admin.service';



@Injectable()

export class UserClassShowStudentResolver implements Resolve<UserClass> {
    constructor(private adminSevice: AdminService, private router:Router , private alertify:AlertifyService){}
    resolve(route:ActivatedRouteSnapshot):Observable<UserClass>{
        return this.adminSevice.getUserClass(route.params['userClassId']).pipe(
            catchError(error =>{
                this.alertify.error('يوجد مشكلة في عرض البيانات');
                this.router.navigate(['/admin']);
                return of(null);
            })
        )
    }
}
