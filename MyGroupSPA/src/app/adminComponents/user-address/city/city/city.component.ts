import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UserCity } from 'src/app/_models/user-City';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities:UserCity[];
  term:any;
  city:UserCity;

  p: number = 1;


  constructor(public  adminService:AdminService,private alertifyService:AlertifyService , private fb:FormBuilder) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshCityList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.adminService.selectedCity = {
      userCityId: null,
      userCityName: ""
    }
  }

  onSubmit(myform: NgForm) {
    if (myform.value.userCityId ==  null) {
      this.adminService.insertCity(myform.value).subscribe((res) => {
        this.resetForm(myform);
        this.refreshCityList();
        this.alertifyService.success("تمت الاضافة");
      });
    }
    else {
      this.adminService.updateCity(myform.value).subscribe((res) => {
        this.resetForm(myform);
        this.refreshCityList();
        this.alertifyService.success("تم التعديل");
      });
    }
  }

  onEdit(city:UserCity) {
    this.adminService.selectedCity = city;
  }



  refreshCityList() {
    this.adminService.getCities().subscribe(
      (cities:UserCity[])=>{this.cities=cities},
      error=>{this.alertifyService.error(error)}
    )
  }
  deleteCity(userCityId:any, myform:NgForm){
    this.alertifyService.confirm("هل تريد حذف هذه المدينه",()=>{
      this.adminService.deleteCity(userCityId).subscribe(
        ()=>{

        },
        error=>{
          this.cities.splice(this.cities.findIndex(c=>c.userCityId == userCityId),1);
          this.refreshCityList();
          this.resetForm(myform);
          this.alertifyService.success("تم حذف المدينه بنجاح");
        }
      )
    })
  }






}
