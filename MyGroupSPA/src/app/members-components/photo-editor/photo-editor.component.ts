import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos:Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.baseUrl;
  currentMain : Photo;
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  constructor(private authService: AuthService , private userService:UserService ,private alertifyService:AlertifyService , private route:ActivatedRoute) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader(
      {
   url: this.baseUrl + 'user/' + this.authService.decodedToken.nameid + '/photo',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024,
        
      }
    );
    // to upload photo and appear at the same time
    this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false;};
    this.uploader.onSuccessItem=(item,Response,status,headers)=>{
      if(Response){
        const res:Photo = JSON.parse(Response);
        const photo ={
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          isMain:res.isMain
        };
        this.photos.push(photo);

        if(this.photos.push(photo)){
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl=photo.url;
          localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
      }
      
      }
    }
  }

  setMainPhoto(photos:Photo){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid , photos.id).subscribe(
      ()=>{this.currentMain = this.photos.filter(p=>p.isMain === true)[0]
        this.currentMain.isMain = false ;
        photos.isMain=true 
        // this.getMemberPhotoChange.emit(photos.url);
        this.authService.changeMemberPhoto(photos.url)
        this.authService.currentUser.photoUrl=photos.url;
        localStorage.setItem('user' , JSON.stringify(this.authService.currentUser));
      },
    error=>{this.alertifyService.error('يوجد مشكله في تعيين الصورة الاساسية')}
    )
  }

  deletePhoto(id:number){
    this.alertifyService.confirm("هل تريد حذف الصورة ؟",()=>{
   this.userService.deletePhoto(this.authService.decodedToken.nameid,id).subscribe(
          ()=>{
            this.photos.splice(this.photos.findIndex(p=>p.id==id),1);
            this.alertifyService.success("تم حذف الصورة بنجاح")
          },
          error=>{this.alertifyService.error(error)}
        )
      })
    }
  


}
