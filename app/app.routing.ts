import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';

export const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'create', component: CreateComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
