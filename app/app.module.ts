import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { CouchbaseInstance } from './couchbaseinstance';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ListComponent,
        CreateComponent
    ],
    providers: [
        CouchbaseInstance
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
