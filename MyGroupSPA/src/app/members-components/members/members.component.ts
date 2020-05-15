import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/Pagination';
import { AuthService } from 'src/app/_services/auth.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/_services/admin.service';
import { UserVillage } from 'src/app/_models/user-village';
import { UserCity } from 'src/app/_models/user-City';
import { UserGovernorate } from 'src/app/_models/user-governorate';
import { UserCountry } from 'src/app/_models/user-country';
import { UserClass } from 'src/app/_models/user-class';



@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  user : User=JSON.parse(localStorage.getItem('user'));
  users:User[] 

  userVillages:UserVillage[];
  userClass:UserClass[];


  genderList=[
    {value:'طالب' , display : 'طلاب'},
    {value:'طالبه' , display : 'طالبات'},
    {value:'ولي امر', display:'اولياء امور'},
    {value:'معلم', display:'معلمين '}
  ];
  public userParams:any={}
  pagination:Pagination;


  constructor(public authService:AuthService,private adminService:AdminService,private userService:UserService, private alertifyService:AlertifyService , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data=>{this.users=data['users'].result
      this.pagination=data['users'].pagination;
    }

    )
    this.userParams.gender = this.user.gender === 'طالب'?'طالب':'طالبه' ;
    this.userParams.orderBy = "arabicName";
    this.userParams.UserVillageName;
    this.userParams.UserClassName;
   

    // this.loadUsers();
    this.getUserVillage();
    this.getUserClasses();

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }




  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemPerPage , this.userParams).subscribe((res:PaginationResult<User[]>)=>{
       (users:User[])=>{this.users=users}
       this.users=res.result;
       this.pagination=res.pagination;
     },
          error=>this.alertifyService.error(error))
    }
    
    resetFilter(){
      // لكي يعود بالقيم الافتراضية
      this.userParams.gender = this.user.gender === 'طالب'?'طالب':'طالبه' ;
      this.userParams.orderBy = "arabicName";
      this.userParams.UserVillageName;
    }

    getUserVillage(){
      this.adminService.getUserVillages().subscribe(
        (userVillages:UserVillage[])=>{this.userVillages=userVillages}
      )
    }
  getUserClasses(){
    return this.adminService.getUsersClasses().subscribe(
      (userClass:UserClass[])=>this.userClass=userClass,
      error=>this.alertifyService.error(error)
    )
  }
   

}
