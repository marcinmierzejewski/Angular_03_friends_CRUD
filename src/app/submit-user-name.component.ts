import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submit-user-name',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <input 
        #InputName
        (keyup.enter)="submitUserName.emit(InputName.value); InputName.value=''"
        class="border-2 border-rose-500 focus:border-rose-900 rounded-md"

      >
      <button 
        (click)="submitUserName.emit(InputName.value); InputName.value=''"
      >Create</button>
    </div>
  `,
  styles: [
  ]
})
export class SubmitUserNameComponent {
  @Output() submitUserName = new EventEmitter<string>()
}
