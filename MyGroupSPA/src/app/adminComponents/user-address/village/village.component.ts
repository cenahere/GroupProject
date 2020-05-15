import { Component, OnInit } from '@angular/core';
import { UserVillage } from 'src/app/_models/user-village';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit {

  userVillage : UserVillage[];
  term:string;
  p :number=1;
  constructor(public adminSerivce:AdminService , private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshVillageList();
  }



  refreshVillageList(){
    return this.adminSerivce.getUserVillages().subscribe(
      (userVillages:UserVillage[])=>this.userVillage=userVillages,
      error=>{this.alertifyService.error(error)}
    )
  }
  resetForm(form?:NgForm){
    if(form){
      form.reset();
    }
    this.adminSerivce.selectedVillage = {
      userVillageId : null,
      userVillageName : ""
    }
  }

  onSubmit(myForm:NgForm){
    //insert
    if(myForm.value.userVillageId == null){
      this.adminSerivce.insertUserVillage(myForm.value).subscribe((res)=>{
        this.resetForm(myForm);
        this.refreshVillageList();
        this.alertifyService.success("تمت الاضافة");
      });
    }
    else{
      this.adminSerivce.updateUserVillage(myForm.value).subscribe((res)=>{
        this.resetForm(myForm);
        this.refreshVillageList();
        this.alertifyService.success("تم التعديل");
      });
    }
  }

  onEdit(userVillage:UserVillage){
    this.adminSerivce.selectedVillage = userVillage;
  }

  deleteUserVillage(userVillageId:any, myform:NgForm){
    this.alertifyService.confirm("هل تريد حذف هذه المدينه",()=>{
      this.adminSerivce.deleteUserVillage(userVillageId).subscribe(
        ()=>{
	// لا اعلم لماذا لا ياتي من ال  Success
        },
        error=>{
          this.userVillage.splice(this.userVillage.findIndex(c=>c.userVillageId == userVillageId),1);
          this.refreshVillageList();
          this.resetForm(myform);
          this.alertifyService.success("تم حذف القريه بنجاح");
        }
      )
    })
  }

}
