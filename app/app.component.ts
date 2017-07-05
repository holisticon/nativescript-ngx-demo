import { Component, OnInit } from '@angular/core';
import { init, getCurrentPushToken } from 'nativescript-plugin-firebase';

import { PushService } from './services';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private pushService: PushService) {

  }

  public ngOnInit(): void {
    this.pushService.init().subscribe();
  }

}
