import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserToAdmin } from 'src/app/_models/user-to-admin';
import {  NgForm } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserCity } from 'src/app/_models/user-City';
import { UserClass } from 'src/app/_models/user-class';
import { UserVillage } from 'src/app/_models/user-village';
import { UserGovernorate } from 'src/app/_models/user-governorate';
import { UserCountry } from 'src/app/_models/user-country';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';
import { UserGroup } from 'src/app/_models/user-groups';

@Component({
  selector: 'app-user-to-admin-create',
  templateUrl: './user-to-admin-create.component.html',
  styleUrls: ['./user-to-admin-create.component.css']
})
export class UserToAdminCreateComponent implements OnInit {

  cities: UserCity[];
  userClass: UserClass[];
  userVillages: UserVillage[];
  userGovernorates: UserGovernorate[];
  userCountries: UserCountry[];
  userGroups:UserGroup[];

  citySelected: string;
  @Output() addUserByAdmin = new EventEmitter();
  model: any = {}

  user:User;


  constructor(private adminService: AdminService,public bsModalRef: BsModalRef ,private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.getCities();
    this.getUserClasses();
    this.getUserGovernorates();
    this.getUserVillages();
    this.getUserCountries();
    this.getUserGroup();

  }


  userToAdminTCreate(addUserForm:NgForm){
    if(addUserForm.value){
      this.user = Object.assign({},addUserForm).value;
      this.adminService.userToAdminCreate(addUserForm.value).subscribe(
        res=>{
          this.alertifyService.success("تم اضافة العضو ");
          this.addUserByAdmin.emit(addUserForm.value);
          this.bsModalRef.hide();
        },
        error=>{this.alertifyService.error(error)}
      )
    }

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

  onCitySelected(val: any) {
    this.citySelected = val;
  }

  getUserClasses() {
    return this.adminService.getUsersClasses().subscribe(
      (userClass: UserClass[]) => this.userClass = userClass,
      error => this.alertifyService.error(error)
    )
  }

  getUserVillages() {
    return this.adminService.getUserVillages().subscribe(
      (userVillages: UserVillage[]) => this.userVillages = userVillages,
      error => { this.alertifyService.error(error) }
    )
  }
  getUserGovernorates() {
    return this.adminService.getUserGovernorates().subscribe(
      (userGovernorates: UserGovernorate[]) => this.userGovernorates = userGovernorates,
      error => { this.alertifyService.error(error) }
    )
  }
  getUserCountries() {
    return this.adminService.getUserCountries().subscribe(
      (userContries: UserCountry[]) => this.userCountries = userContries,
      error => { this.alertifyService.error(error) }
    )
  }
  getUserGroup(){
    return this.adminService.getUserGroups().subscribe(
      (userGroups:UserGroup[])=>{this.userGroups=userGroups}

    )
  }




}
