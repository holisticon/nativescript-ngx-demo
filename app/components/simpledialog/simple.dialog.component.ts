import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

@Component({
  templateUrl: 'simple.dialog.component.html'
})
export class SimpleDialog {

  title: string;
  text: string;
  confirmText: string;
  cancelText: string;

  constructor(private params: ModalDialogParams) {
    console.debug('Using following dialog params', params);
    this.title = params.context.title;
    this.text = params.context.text;
    this.confirmText = params.context.confirmText;
    this.cancelText = params.context.cancelText;
  }

  cancel() {
    this.params.closeCallback(false);
  }

  confirm() {
    this.params.closeCallback(true);
  }
}
