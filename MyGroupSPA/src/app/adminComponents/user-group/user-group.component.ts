import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { UserGroup } from 'src/app/_models/user-groups';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {
  userGroups:UserGroup[];
  userGroup:UserGroup;
  term:string;
  p:number=1;
  constructor(private adminService:AdminService, private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.getUserGroup();
  }

  getUserGroup(){
    return this.adminService.getUserGroups().subscribe(
      (userGroups:UserGroup[])=>{this.userGroups=userGroups}

    )
  }

}
