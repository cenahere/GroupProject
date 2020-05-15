import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../_services/admin.service';
import { UserToAdmin } from '../_models/user-to-admin';

@Injectable()
export class UserToAdminResolver implements Resolve<UserToAdmin[]>{

    pageNumber=1;
    pageSize=30;

    constructor(private adminService:AdminService , private router:Router , private alertifyService:AlertifyService){}

    resolve(route:ActivatedRouteSnapshot):Observable<UserToAdmin[]>{
        return this.adminService.getUsersToAdmin(this.pageNumber, this.pageSize).pipe(
            catchError(error=>{
                this.alertifyService.error('هناك مشكله في عرض البيانات');
                this.router.navigate(['']);
                return of(null);
            })
        )
    }
}
