import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';



@Injectable()

export class MemeberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router:Router , private alertify:AlertifyService){}
    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error =>{
                this.alertify.error('يوجد مشكلة في عرض البيانات');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }
}
