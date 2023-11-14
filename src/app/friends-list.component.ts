import { Component, Input } from "@angular/core";
import { CommonModule, NgFor } from "@angular/common";
import { Friend } from "./Friend";

@Component({
  selector: "app-friends-list",
  standalone: true,
  imports: [CommonModule, NgFor],
  template: `
    <div>
      <ul>
        <li
          class="flex justify-start items-center"
          *ngFor="let friend of friends"
        >
          <img class="w-10 h-10" src="{{ friend.avatar }}" alt="avatar" />
          <button
            class="w-5 h-5 rounded-xl m-4 {{
              friend.isOnline ? 'bg-lime-500' : 'bg-rose-900'
            }}"
            (click)="changeLoginStatus(friend)"
          ></button>
          {{ friend.name }}
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class FriendsListComponent {
  @Input({ required: true }) friends: Friend[] = [
    // 
  ];

  changeLoginStatus(friend: Friend) {
    friend.isOnline = !friend.isOnline;
  }
}
