import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

@Component({
  templateUrl: 'input.dialog.component.html'
})
export class InputDialog {

  @ViewChild('inputField') inputField: ElementRef;

  title: string;
  placeholder: string;
  confirmText: string;
  cancelText: string;
  input: string;

  _isValid: (value: string) => boolean;

  constructor(private params: ModalDialogParams) {
    console.debug('Using following dialog params', params);
    this.title = params.context.title;
    this.placeholder = params.context.placeholder;
    this.confirmText = params.context.confirmText;
    this.cancelText = params.context.cancelText;

    this.input = '';
    this._isValid = params.context.isValid;
  }

  cancel() {
    this.inputField.nativeElement.dismissSoftInput();
    this.params.closeCallback(null);
  }

  confirm() {
    this.inputField.nativeElement.dismissSoftInput();
    this.params.closeCallback(this.input);
  }

  isValid() {
    if (!this._isValid) {
      return true;
    }

    return this._isValid(this.input);
  }
}
