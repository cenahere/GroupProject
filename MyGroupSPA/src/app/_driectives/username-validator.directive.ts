// import { Directive } from '@angular/core';
// import { NG_ASYNC_VALIDATORS, AsyncValidator, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
// import { AuthService } from '../_services/auth.service';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { UserService } from '../_services/user.service';

// export function usernameValidatorDirective(userService:UserService):AsyncValidatorFn{
//   return (control: AbstractControl):Promise<ValidationErrors |null > | Observable<ValidationErrors | null> => {
//     return userService.getUserByUserName(control.value).pipe(
//       map(users=>{
//         return users && users.length>0 ? {'userNameValidator':true}:null;
//       })
//     )

//   }
// }

// @Directive({
//   selector: '[userNameValidator]',
//   providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:usernameValidatorDirective,multi:true}]
// })
// export class UsernameValidatorDirective implements AsyncValidator {

//   constructor(private userService:UserService) { }
//   validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
//     return this.userService.getUserByUserName(control.value).pipe(
//       map(users=>{
//         return users && users.length>0 ? {'userNameValidator':true}:null;
//       })
//     )
//   } 

// }
