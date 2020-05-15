import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
   user:User;
   galleryOptions: NgxGalleryOptions[];
   galleryImages: NgxGalleryImage[];
   created:string;
   dateOfBirth:string;
   options={weekday:'long' , year:'numeric' , month:'long' , day:'numeric'};
   showAbout:boolean=true;
   @ViewChild('memberTabs',{static:true}) memberTabs:TabsetComponent;
  

  constructor(private alertifyService:AlertifyService ,private authService :AuthService, private userService:UserService , private route:ActivatedRoute) { }

  ngOnInit(): void {
  
    this.route.data.subscribe(data=>{
      this.user=data['user']
    })
    this.showAbout=true;

    this.galleryOptions=[{
      width:'500px',
      height:'500px',
      imagePercent:100,
      thumbnailsColumns:4,
      imageAnimation:NgxGalleryAnimation.Slide,
      preview:false
    }]
    this.galleryImages = this.getImages();

    this.created = new Date(this.user.created).toLocaleString("ar-EG" , this.options).replace("،", "");
    this.dateOfBirth= new Date (this.user.dateOfBirth).toLocaleString("ar-EG" , this.options).replace("،", "");
  
    this.route.queryParams.subscribe(
      params=>{
         // متغير يخزن به الرقم ثلاثة للتاب
        const selectTabs=params['tab'];
      	// لو الروت به كوري برمز فدا يدي صفر فدا خطا يروح عي التابة الاولي علي الاقل واحد فيفح الصفر اي التابة الاولي 
	// وكان علي الشريط  members/1?tab3
        this.memberTabs.tabs[selectTabs>0?selectTabs:0].active=true;
      }
    )

    // this.loadUser()
  
  }


  getImages(){
    const imageUrls = [];
    for(let i =0 ; i< this.user.photos.length ; i++){
      imageUrls.push({
        small:this.user.photos[i].url,
        medium:this.user.photos[i].url,
        big:this.user.photos[i].url
      })
    };
    return imageUrls;
  }

  selectTabs(tabId:number){
    this.memberTabs.tabs[tabId].active=true;
  }


  deSelect(){
    this.authService.HubConnection.stop();
  }

  // loadUser(){
  //   this.userService.getUser(+this.route.snapshot.params.id).subscribe(
  //     (user:User)=>{this.user=user},
  //     error=>{this.alertifyService.error(error)}
  //   )
  // }

}
