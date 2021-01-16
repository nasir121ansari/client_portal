import { Injectable } from '@angular/core';
import { Setting } from '../models/Setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  setting:Setting ={
    allowRegistration:true,
    disabledBalanceOnAdd:true,
    disabledBalanceOnEdit:true
  }
  constructor() {
    if(localStorage.getItem('setting') != null){
      this.setting = JSON.parse(localStorage.getItem('setting'));
    }
   }
  getSettings():Setting{
    return this.setting;
  }
  changeSetting(setting:Setting){
    localStorage.setItem('setting',JSON.stringify(setting));
  }
}
