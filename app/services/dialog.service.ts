import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';

import { SelectOneDialog, SimpleDialog, InputDialog } from '../components';

@Injectable()
export class DialogService {
  public viewContainerRef: any;

  constructor(private modalDialogService: ModalDialogService) {
  }

  public showSelectOneDialog(title: string, options: RadioButtonOption[], confirmText: string, cancelText: string, selectedOption: string = null): Observable<RadioButtonOption> {
    let context = {
      title: title,
      options: options,
      confirmText: confirmText,
      cancelText: cancelText,
      preselection: selectedOption

    };
    return Observable.fromPromise(this.modalDialogService.showModal(SelectOneDialog, {
      fullscreen: false,
      context: context,
      viewContainerRef: this.viewContainerRef
    }));
  }

  public showSimpleDialog(title: string, text: string, confirmText: string, cancelText?: string): Observable<any> {
    let context = {
      title: title,
      text: text,
      confirmText: confirmText,
      cancelText: cancelText
    };
    return Observable.fromPromise(this.modalDialogService.showModal(SimpleDialog, {
      fullscreen: false,
      context: context,
      viewContainerRef: this.viewContainerRef
    }));
  }

  public showInputDialog(title: string, confirmText: string, cancelText: string, placeholder: string = '', isValid?: (value: string) => boolean): Observable<string> {
    let context = {
      title: title,
      placeholder: placeholder,
      confirmText: confirmText,
      cancelText: cancelText,
      isValid: isValid
    };
    return Observable.fromPromise(this.modalDialogService.showModal(InputDialog, {
      fullscreen: false,
      context: context,
      viewContainerRef: this.viewContainerRef
    }));
  }
}

export interface RadioButtonOption {
  displayValue: string;
  key: any;
}
