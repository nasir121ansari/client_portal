import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{Client} from '../../models/Client';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import {SettingService} from '../../services/setting.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn:boolean;
loggedInUser:string;
showRegister:boolean;
  constructor(
    private authService:AuthService,
      private router:Router,
      private flashMessage:FlashMessagesService,
      private settingService:SettingService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth =>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn=false;
      }
    })
    this.showRegister = this.settingService.getSettings().allowRegistration;
  }
  onLogoutClick(){
    this.authService.logOut();
    this.flashMessage.show('you are now Logout',{cssClass:'alert-success' , timeout:3000});
    this.router.navigate(['/login']);
  }
}
