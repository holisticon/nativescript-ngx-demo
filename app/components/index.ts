import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { InputDialog } from './inputdialog';
import { RadioButtonComponent, RadioButtonGroupComponent, RadioButtonOption } from './radiobutton';
import { SimpleDialog } from './simpledialog';
import { SelectOneDialog } from './selectonedialog';

@NgModule({
  bootstrap: [
  ],
  imports: [
    NativeScriptModule
  ],
  declarations: [
    InputDialog,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    SimpleDialog,
    SelectOneDialog
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ComponentsModule { }

export {
  InputDialog,
  RadioButtonComponent,
  RadioButtonGroupComponent,
  RadioButtonOption,
  SimpleDialog,
  SelectOneDialog
};
