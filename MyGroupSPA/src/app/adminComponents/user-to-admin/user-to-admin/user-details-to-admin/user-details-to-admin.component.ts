import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserAttend } from 'src/app/_models/user-attend';

@Component({
  selector: 'app-user-details-to-admin',
  templateUrl: './user-details-to-admin.component.html',
  styleUrls: ['./user-details-to-admin.component.css']
})
export class UserDetailsToAdminComponent implements OnInit {

  user:User;
  constructor(private adminService:AdminService , private alertifyService : AlertifyService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data=>this.user=data['userToAdmin']
    )
  }



}
