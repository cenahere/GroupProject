import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AdminService } from '../_services/admin.service';
import { UserGroup } from '../_models/user-groups';


@Injectable()

export class UserGroupShowStudentResolver implements Resolve<UserGroup> {
    constructor(private adminSevice: AdminService, private router:Router , private alertify:AlertifyService){}
    resolve(route:ActivatedRouteSnapshot):Observable<UserGroup>{
        return this.adminSevice.getUserGroup(route.params['userGroupId']).pipe(
            catchError(error =>{
                this.alertify.error('يوجد مشكلة في عرض البيانات');
                this.router.navigate(['/admin']);
                return of(null);
            })
        )
    }
}
