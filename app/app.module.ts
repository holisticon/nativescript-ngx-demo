import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ngx-fonticon';
import { FabricModule } from 'nativescript-fabric/angular';

import { ComponentsModule } from './components';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { CouchbaseInstance } from './couchbaseinstance';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { DialogService } from './services/dialog.service';
import { PushService } from './services/push.service';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        ComponentsModule,
        AppRoutingModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.css',
            'ion': './fonts/ionicons.css'
        }),
        FabricModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        ListComponent,
        CreateComponent,
    ],
    providers: [
        CouchbaseInstance,
        DialogService,
        PushService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
