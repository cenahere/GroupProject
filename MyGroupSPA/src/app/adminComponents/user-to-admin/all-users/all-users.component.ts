import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { UserToAdmin } from 'src/app/_models/user-to-admin';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  userToAdmin:UserToAdmin[];
  term:string;
  p:number=1;
  bsModalRef: BsModalRef;

  constructor(private adminService:AdminService,private alertifyService:AlertifyService,private modalService: BsModalService ) { }
  ngOnInit(): void {
    // this.getAllUsers();
    this.getUsersWithRoles();
  }
  // getAllUsers(){
  //   return this.adminService.getAllUsers().subscribe(
  //     (userAdmins:UserToAdmin[])=>{this.userToAdmin=userAdmins},
  //     error=>{this.alertifyService.error(error)}
  //   )
  // }

  getUsersWithRoles(){
    this.adminService.getUserWithRoles().subscribe(
      (userAdmins:UserToAdmin[])=>{
        this.userToAdmin = userAdmins;
      },
      error =>{
        this.alertifyService.error('حدثت مشكلة في جلب المستخدمين');
      }
    )
  }


  editRolesModal(user:User){
    const initialState = {
     user,
     roles : this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values)=>{
      const rolesToUpdate = {
        roleNames : [...values.filter(el=>el.checked===true).map(el=>el.value)]
      };
     if(rolesToUpdate){
       this.adminService.updateEditRoles(user,rolesToUpdate).subscribe(
         ()=>{
           user.roles = [...rolesToUpdate.roleNames];
         },error=>this.alertifyService.error(error)
       );
     }
    })
  }
  
  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles as any[];
    const availableRoles: any[] = [
      {name: 'مدير النظام', value: 'Admin'},
      {name: 'مشرف', value: 'Moderator'},
      {name: 'عضو', value: 'Member'},
      {name: 'مشترك', value: 'VIP'},
    ];

    availableRoles.forEach(aRole=>{
      let isMatch =false;
      userRoles.forEach(uRole=>{
        if(aRole.value===uRole){
          isMatch=true;
          aRole.checked = true;
          roles.push(aRole);
          return;
         }
      })
      if(!isMatch){
        aRole.checked=false;
        roles.push(aRole);
      }
    })
    return roles;
  }


}
