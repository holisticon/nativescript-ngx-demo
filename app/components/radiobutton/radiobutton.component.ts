import {Component, Input, Output, EventEmitter} from '@angular/core';
import {RadioButtonOption} from '../';

@Component({
  selector: 'ntRadioButton',
  templateUrl: 'radiobutton.component.html'
})
export class RadioButtonComponent {
  @Input() value: RadioButtonOption;
  @Output() activated = new EventEmitter<void>();
  @Input() isActive: boolean = false;

  constructor() {
  }

  setActive(): void {
    this.isActive = true;
    this.activated.emit();
  }

}
