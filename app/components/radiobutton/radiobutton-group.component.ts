import { Component, Input, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { RadioButtonComponent } from './radiobutton.component';
import { RadioButtonOption } from '../';

@Component({
  selector: 'ntRadioButtonGroup',
  templateUrl: 'radiobutton-group.component.html'
})
export class RadioButtonGroupComponent {
  @Input() orientation: string = 'vertical';
  @Input() options: Array<RadioButtonOption>;
  @Input() preselected: string;
  @ViewChildren(RadioButtonComponent) buttons: QueryList<RadioButtonComponent>;

  @Output() active = new EventEmitter<RadioButtonOption>();

  constructor() {
  }

  deactivateExcept(optionIndex: number): void {
    this.buttons.forEach((button: RadioButtonComponent, index: number) => {
      if (index !== optionIndex) {
        button.isActive = false;
      }
    });

    this.active.emit(this.options[optionIndex]);
  }

  getResult(): RadioButtonOption {
    let result: RadioButtonOption = null;
    this.buttons.forEach((button: RadioButtonComponent) => {
      if (button.isActive) {
        result = button.value;
      }
    });
    return result;
  }
}
