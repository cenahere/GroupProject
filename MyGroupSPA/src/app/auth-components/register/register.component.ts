import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { arLocale } from 'ngx-bootstrap/locale';
import { UserClass } from 'src/app/_models/user-class';
import { AdminService } from 'src/app/_services/admin.service';
import { UserCity } from 'src/app/_models/user-City';
import { UserVillage } from 'src/app/_models/user-village';
import { UserCountry } from 'src/app/_models/user-country';
import { UserGovernorate } from 'src/app/_models/user-governorate';
import { UserGroup } from 'src/app/_models/user-groups';

defineLocale('ar', arLocale);


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  user: User;
  cities: UserCity[];
  userClass:UserClass[];
  userVillages:UserVillage[];
  userGovernorates:UserGovernorate[];
  userCountries:UserCountry[];
  userGroups:UserGroup[];

  citySelected: string;


  bsConfig: Partial<BsDatepickerConfig>;

  locale = 'ar';

  constructor(private localeService: BsLocaleService, private adminService: AdminService, private fb: FormBuilder, private router: Router, private authService: AuthService, private alertifyService: AlertifyService) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.createRegisterForm();
    this.bsConfig = {
      containerClass: 'theme-red',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY'
    };
    this.getCities();
    this.getUserClasses();
    this.getUserVillages();
    this.getUserCountries();
    this.getUserGovernorates();
    this.getUserGroup();
  }

  getCities() {
    this.adminService.getCities().subscribe(
      (cities: UserCity[]) => {
      this.cities = cities
        console.log(cities)
      },
      error => { this.alertifyService.error(error) }
    )
  }

  register() {
    if (this.registerForm.value) {
      this.user = Object.assign({}, this.registerForm).value;
      this.authService.register(this.user).subscribe(
        () => { this.alertifyService.success("تم الاشتراك بنجاح") },
        error => { this.alertifyService.error(error) },
        () => {
          this.authService.login(this.user).subscribe(
            () => { this.router.navigate(['/members']) }
          )
        }
      )
    }
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      arabicName: ['', Validators.required],
      gender: ['طالب'],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userPhone: ['', Validators.required],
      guardianName: ['', Validators.required],
      guardianPhone: ['', Validators.required],
      userCityId:['',Validators.required],
      userClassId: ['',Validators.required],
      userVillageId:['',Validators.required],
      userGovernorateId:['',Validators.required],
      userCountryId:['',Validators.required],
      userGroupId:['',Validators.required]
    }, { validator: this.passwordMatchValidators })
  }

  passwordMatchValidators(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value ? null : { mismatch: true }
  }
  cancel() {
    this.alertifyService.warning('تم تاجيل تسجيلك حاليا');
    this.cancelRegister.emit(false);
  }


  onCitySelected(val: any) {
    this.citySelected = val;
  }

  getUserClasses(){
    return this.adminService.getUsersClasses().subscribe(
      (userClass:UserClass[])=>this.userClass=userClass,
      error=>this.alertifyService.error(error)
    )
  }

  getUserVillages(){
    return this.adminService.getUserVillages().subscribe(
      (userVillages:UserVillage[])=>this.userVillages=userVillages,
      error=>{this.alertifyService.error(error)}
    )
  }
  getUserGovernorates(){
    return this.adminService.getUserGovernorates().subscribe(
      (userGovernorates:UserGovernorate[])=>this.userGovernorates=userGovernorates,
      error=>{this.alertifyService.error(error)}
    )
  }
  getUserCountries(){
    return this.adminService.getUserCountries().subscribe(
      (userContries:UserCountry[])=>this.userCountries=userContries,
      error=>{this.alertifyService.error(error)}
    )
  }

  getUserGroup(){
    return this.adminService.getUserGroups().subscribe(
      (userGroups:UserGroup[])=>{this.userGroups=userGroups}

    )
  }

}
