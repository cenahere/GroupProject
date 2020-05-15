import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberEditResolver implements Resolve<User>{
    constructor(private alertifyService:AlertifyService,private authServiec:AuthService , private userServie:UserService , private router:Router){}
    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userServie.getUser(this.authServiec.decodedToken.nameid).pipe(
            catchError(error=>{
                this.alertifyService.error('هناك مشكله في عرض البيانات');
                this.router.navigate(['/members']);
                return of(null)
            })
        )
    }
}