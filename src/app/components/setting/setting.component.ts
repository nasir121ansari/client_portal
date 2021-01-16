import { Component, OnInit } from '@angular/core';
import { Setting } from '../../models/Setting';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import {SettingService} from '../../services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
setting:Setting;
  constructor(
    private router:Router,
      private flashMessage:FlashMessagesService,
      private settingService:SettingService
  ) { }
  ngOnInit() {
    this.setting = this.settingService.getSettings()
    console.log(this.setting);
  }
  onSubmit(){
    this.settingService.changeSetting(this.setting);
    this.flashMessage.show('Setting Save',{cssClass:'alert-success' , timeout:3000});
  }
 

}
