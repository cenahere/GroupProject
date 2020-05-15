import { Component, OnInit } from '@angular/core';
import { UserGovernorate } from 'src/app/_models/user-governorate';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})
export class GovernorateComponent implements OnInit {
  
  userGovernorates:UserGovernorate[];
  term:any;
  p:number = 1;

  constructor(public adminService:AdminService , private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.refrestGovernorateList();
    this.resetForm();
  }
  refrestGovernorateList(){
    return this.adminService.getUserGovernorates().subscribe(
      (userGovernorates:UserGovernorate[])=>{this.userGovernorates = userGovernorates},
      (error)=>{this.alertifyService.error(error)}
    )
  }
  
  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.adminService.selectedGovernorate  = {
      userGovernorateId : null,
      userGovernorateName : ""
    }
  }

  onSubmit(myForm:NgForm){
    //insert
    if(myForm.value.userGovernorateId == null) {
      this.adminService.insertUserGovernorate(myForm.value).subscribe((res)=>{
        this.resetForm(myForm);
        this.refrestGovernorateList();
        this.alertifyService.success("تمت الاضافة")
      });
      // update
    }else{
      this.adminService.updateUserGovernorate(myForm.value).subscribe((res)=>{
        this.resetForm(myForm);
        this.refrestGovernorateList();
        this.alertifyService.success("تمت التعديل")
      });
    }
  }

  onEdit(userGovernorate:UserGovernorate){
    this.adminService.selectedGovernorate=userGovernorate;
  }
  deleteUserGovernorate(userGovernorateId:any, myform:NgForm){
    this.alertifyService.confirm("هل تريد حذف هذه المحافظة",()=>{
      this.adminService.deleteUserGovrnorate(userGovernorateId).subscribe(
        ()=>{
          this.userGovernorates.splice(this.userGovernorates.findIndex(c=>c.userGovernorateId == userGovernorateId),1);
          this.refrestGovernorateList();
          this.resetForm(myform);
          this.alertifyService.success("تم حذف المحافظة بنجاح");
        },
        error=>{

        }
      )
    })
  }

}
