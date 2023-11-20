import { Component, Input } from "@angular/core";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { Friend } from "./Friend";
import { RemoveItemButtonComponent } from "./remove-item-button.component";

@Component({
  selector: "app-friends-list",
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RemoveItemButtonComponent],
  template: `
    <div>
      <ul>
        <li
          class="flex justify-start items-center bg-amber-200 p-5 m-10 max-w-md rounded-lg shadow-md"
          *ngFor="let friend of friends"
        >
          <img class="w-10 h-10" src="{{ friend.avatar }}" alt="avatar" />
          <button
            class="w-5 h-5 rounded-xl m-4 {{
              friend.isOnline ? 'bg-lime-500' : 'bg-rose-900'
            }}"
            (click)="changeLoginStatus(friend)"
          ></button>
          <input
            *ngIf="isEditMode; else normalMode"
            (keyup.escape)="isEditMode = false"
            [value]="friend.name"
          />

          <ng-template #normalMode>
            <p (dblclick)="openEditMode()">{{ friend.name }}</p>
          </ng-template>

          <div class="flex justify-end p-4">
            <app-remove-item-button 
              [nameDeleteItem]="friend.name"
            
            />
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class FriendsListComponent {
  @Input({ required: true }) friends: Friend[] = [];

  isEditMode = false;

  changeLoginStatus(friend: Friend) {
    friend.isOnline = !friend.isOnline;
  }

  openEditMode() {
    this.isEditMode = true;
  }
}
