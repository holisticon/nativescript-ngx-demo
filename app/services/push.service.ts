import 'rxjs/add/observable/forkJoin';
import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { init, getCurrentPushToken } from 'nativescript-plugin-firebase';
import { getPlatformDetails } from 'nativescript-appinfo';
import * as Email from 'nativescript-email';
import * as Toast from 'nativescript-toast';

@Injectable()
export class PushService {

  private firebaseInitialized: boolean;
  private userdevice_register_url: string;

  constructor(
    private router: Router,
    private zone: NgZone) {
    this.firebaseInitialized = false;
  }

  init(): Observable<any> {
    return this.getCurrentPushToken().flatMap((existingToken: string) => {
      if (!!existingToken) {
        console.info('Reusing existing device token:', existingToken);
        if (!this.firebaseInitialized) {
          this.registerDevice('user', existingToken).subscribe(() => {
          }, err => {
            console.error('Unknown Error during  registerDevice', err);
          });
          return this.configurePush();
        } else {
          return this.registerDevice('user', existingToken);
        }
      }
    });
  }

  private configurePush(): Observable<any> {
    return Observable.create(observer => {
      console.info('Configuring push');
      init({
        onPushTokenReceivedCallback: (token) => {
          console.info('device token:', token);
          this.sendDeviceToken('user', token).subscribe(data => {
            // necessary to trigger observable execution
          }, err => {
            console.error('Error during token receive', err);
          });
          observer.next(token);
          observer.complete();
        },
        onMessageReceivedCallback: (notificationData: any) => {
          console.info('Got following raw push message:', notificationData);
          console.info('Handling push notification');
          this.handlePushNotification(notificationData);
        }
      }).then(
        (instance) => {
          console.info('firebase init done');
          this.firebaseInitialized = true;
        },
        (error) => {
          console.error('Error during push configuration', error);
          observer.error(error);
        }
        );
    });
  }


  /**
   * manually retrieve the current push registration token of the device
   */
  public getCurrentPushToken(): Observable<any> {
    return Observable.create(observer => {
      getCurrentPushToken().then((token: string) => {
        console.info('Got following current token', token);
        observer.next(token);
        observer.complete();
      }, observer.error);
    });
  }

  /**
   * Handle push data messages
   * @param notificationData
   */
  public handlePushNotification(pushData: any): void {
    let heading = pushData.title,
      message = pushData.message,
      data = JSON.parse(pushData);
    console.info('Got following additional push data:', data);
    Toast.makeText('Push data: ' + data);
  }

  /**
   * Try to send locally saved device token to Backend.
   */
  public registerDevice(user: string, token: string): Observable<string> {
    return Observable.create(observer => {
      if (!!token && token.length > 0) {
        console.info('Resending device token:', token);
        this.sendDeviceToken(user, token).subscribe(() => {
          console.info('Post done');
          observer.next(token);
          observer.complete();
        }, (error) => {
          console.error('Got error response during update device token', error);
          observer.error();
        }
        );
      } else {
        observer.error('Got empty token!');
      }
    });
  }

  /**
   * Save given token in Backend
   * @param token to save
   */
  public sendDeviceToken(user: string, token: string): Observable<any> {
    return Observable.create(observer => {
      Email.available().then(available => {
        if (!available) {
          Toast.makeText('Email is not available yet.');
        } else {
          Toast.makeText('Preparing email data...');
          let body = {
            token: token
          };
          Email.compose({
            subject: 'Push token',
            body: JSON.stringify(body)
          }).then(() => {
            console.info('Email composer closed');
          }, err => {
            console.error('Error while sending email: ', err);
          });
        }
      });
    });
  }
}
