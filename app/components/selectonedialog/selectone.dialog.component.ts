import { Component, ViewChild } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { RadioButtonGroupComponent, RadioButtonOption } from '../radiobutton';

@Component({
  templateUrl: 'selectone.dialog.component.html'
})
export class SelectOneDialog {
  @ViewChild(RadioButtonGroupComponent) radioButtonGroup: RadioButtonGroupComponent;

  title: string;
  options: RadioButtonOption[];
  confirmText: string;
  cancelText: string;
  preselection: string;

  constructor(private params: ModalDialogParams) {
    console.debug('Using following dialog params', params);
    this.title = params.context.title;
    this.options = params.context.options;
    this.confirmText = params.context.confirmText;
    this.cancelText = params.context.cancelText;
    this.preselection = params.context.preselection;
  }

  cancel() {
    this.params.closeCallback(null);
  }

  confirm() {
    this.params.closeCallback(this.radioButtonGroup.getResult());
  }
}
