import { Injectable } from '@angular/core';
import { Router,CanActivate } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import {SettingService} from '../../services/setting.service';

@Injectable()
export class RegisterGuard implements CanActivate{
    constructor(
        private afAuth:AngularFireAuth,
        private router:Router,
        private settingService:SettingService
    ){}
    
    canActivate():boolean{
       if(this.settingService.getSettings().allowRegistration){
           return true;
       }else {
           this.router.navigate(['/login']);
           return false;
       }
    }
}