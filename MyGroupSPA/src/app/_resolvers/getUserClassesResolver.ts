import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserClass } from '../_models/user-class';
import { AdminService } from '../_services/admin.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class GetUserClassesResolver implements Resolve<UserClass[]> {
    constructor(private adminService:AdminService , private alertifyService:AlertifyService , private router:Router){}

    resolve(route:ActivatedRouteSnapshot):Observable<UserClass[]>{
        return this.adminService.getUsersClasses().pipe(
            catchError(error=>{
                this.alertifyService.error("خطأ في جلب البيانات");
                this.router.navigate(['']);
                return of(null);
            })
        )
    }
}
