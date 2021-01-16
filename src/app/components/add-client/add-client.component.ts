import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';
import {SettingService} from '../../services/setting.service';
 

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
client:Client ={
  firstName:'',
  lastName:'',
  email:'',
  phone:'',
  balance:0
}
disableBalanceOnAdd:boolean;
@ViewChild('clientForm') form:any;
  constructor(private flashMessage:FlashMessagesService,
             private clientService:ClientService,
             private router:Router,
             private settingService:SettingService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingService.getSettings().disabledBalanceOnAdd;
  }
  onSubmit({value, valid}:{value: Client,valid:boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    if(!valid){
      this.flashMessage.show('Please fields are Mandatory',{cssClass:'alert-danger',timeout:3000});
    }else{
      this.clientService.newClient(value);
      this.flashMessage.show('New Cilent Added',{cssClass:'alert-success',timeout:3000});
      this.router.navigate(['/']);
    }
  }
}
