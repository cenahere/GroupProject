import { Component, OnInit } from '@angular/core';
import { UserCountry } from 'src/app/_models/user-country';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  selectedCountry:UserCountry;
  userCountries:UserCountry[];
  term:any;
  p:number = 1;
  constructor(public adminService:AdminService , private alertifyServie:AlertifyService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshCountryList();
  }
  refreshCountryList(){
    this.adminService.getUserCountries().subscribe(
      (userCountries:UserCountry[])=>{this.userCountries = userCountries},
      error=>{this.alertifyServie.error(error)}
    )
  }
  resetForm(form?:NgForm){
    if(form) 
      form.reset();
    this.adminService.selectCountry = {
      userCountryId:null,
      userCountryName:""
    }
  }


  onSubmit(myForm:NgForm){
    if(myForm.value.userCountryId == null){
      this.adminService.insertUserCountry(myForm.value).subscribe((res)=>{
        this.resetForm(myForm);
        this.refreshCountryList();
        this.alertifyServie.success("تمت الاضافة");
      });
    }else{
      this.adminService.updateUserCountry(myForm.value).subscribe((res)=>{
        this.resetForm(myForm);
        this.refreshCountryList();
        this.alertifyServie.success("تمت التعديل");
      })
    }
  }

  onEdit(userCountry:UserCountry){
    this.adminService.selectCountry = userCountry;
  }

  deleteUserCountry(userCountryId:any , myForm:NgForm){
    this.alertifyServie.confirm("هل تريد حقا هذه الدولة",()=>{
      this.adminService.deleteUserCounty(userCountryId).subscribe(
        ()=>{

        },
        error=>{
          this.refreshCountryList();
          this.resetForm(myForm);
          this.alertifyServie.success("تم حذف الدوله بنجاح");
        }
      )
    })
  }
}
