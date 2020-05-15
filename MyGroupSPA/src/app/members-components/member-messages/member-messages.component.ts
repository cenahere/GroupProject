import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit , AfterViewChecked{
  
  hubConnection:HubConnection;
  hubConnection2 :HubConnection;
  

  @Input() recipientId:number;
messages:Message[];
newMessage:any={};
@ViewChild('panel') panel:ElementRef<any>;

constructor(private userService:UserService , private authService : AuthService,private alertifySevcie:AlertifyService) { }

ngOnInit() {
  this.loadMessage();

    // عمل رابط لو راي فيه كلمه شات يفعل الهب
  this.authService.HubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/chat").build();
  //  مع بداية فتح الكومبوننت ينشا الكونكشن
  this.authService.HubConnection.start();
  // الدالة ويعمل عليها استماع يتاخر لمده نصف ثانية
  this.authService.HubConnection.on("refresh",()=>{

    this.loadMessage();
    this.hubConnection2 = new HubConnectionBuilder().withUrl("http://localhost:5000/chat").build();
  })

}

loadMessage(){
  // الحصول علي الاي دي رقم
   const currentUserId = +this.authService.decodedToken.nameid;

   this.userService.getConverstion(this.authService.decodedToken.nameid,this.recipientId).pipe(
      tap(messages=>{
   //  لو الرسائل اي منها غير مقروء والمستخدم هو هو الحالي يجعلها مقروءة
       for (const message of messages) {
         if(message.isRead === false && message.recipientId === currentUserId)
             {this.userService.markAsRead(currentUserId,message.id);}
              };

       })
     ).subscribe(
         messages => { this.messages=messages.reverse() },
         error=>{this.alertifySevcie.error(error)},

         ()=>{
      // يجيب الرسائل غير المقروءة//
           setTimeout(()=>{
             this.userService.getUnreadCount(this.authService.decodedToken.nameid).subscribe(
               res=>{
                 this.authService.unReadCount.next(res.toString());
                      // ينتظر ثلاثة ثواني بين الرسالة والاخري بحيث يكون زمن مناسب وفاصل
                 setTimeout(()=>{
                   this.userService.getConverstion(this.authService.decodedToken.nameid,this.recipientId).subscribe(
                     messages=>{
                       this.messages=messages.reverse();
                     }
                   );
                 },3000)
               }
             )
           },1000)
         }
       )
     }


sendMessage(){
  this.newMessage.recipientId=this.recipientId;
  this.userService.sendMessage(this.authService.decodedToken.nameid , this.newMessage).subscribe(
  (message:Message)=>{
   this.messages.push(message);
   this.newMessage.content=''; 
  // استدعاء الدالة المراد اظهارها حاليا في الموزع
  this.authService.HubConnection.invoke('refresh')      },error=>{this.alertifySevcie.error(error);},
  ()=>{
    setTimeout(()=>{
      this.hubConnection2.invoke('count'),
      this.userService.getConverstion(this.authService.decodedToken.nameid,this.recipientId).subscribe(
          messages=>{
            this.messages= messages.reverse()

          }
        )
    },0);
  }
)
}


ngAfterViewChecked(): void {
  this.panel.nativeElement.scrollTop=this.panel.nativeElement.scrollHeight;
 }



}
