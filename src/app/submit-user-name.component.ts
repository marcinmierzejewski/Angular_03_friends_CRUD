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

      >
      <button 
        (click)="submitUserName.emit(InputName.value)"
      >Create</button>
    </div>
  `,
  styles: [
  ]
})
export class SubmitUserNameComponent {
  @Output() submitUserName = new EventEmitter<string>()
}
