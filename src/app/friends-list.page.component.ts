import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FriendsListComponent } from "./friends-list.component";
import { Friend } from "./Friend";
import { SubmitUserNameComponent } from "./submit-user-name.component";
import { FriendsService } from "./friends.service";
import { ComponentListState, ListFetchingError } from "./list-state.type";

@Component({
  selector: "app-friends-list-page",
  standalone: true,
  imports: [CommonModule, FriendsListComponent, SubmitUserNameComponent],

  template: `
    <app-submit-user-name 
      (submitUserName)="currentState.state === 'success' && createNewName($event, currentState.result)"
    />
    <app-friends-list
      *ngIf="currentState.state === 'success'"
      [friends]="currentState.result"
    />
    <p *ngIf="currentState.state === 'loading'">Loading...</p>
    <p *ngIf="currentState.state === 'error'">
      {{ currentState.error.message }}
    </p>
  `,
  styles: [],
})
export class FriendsListPageComponent {
  currentState: ComponentListState<Friend> = { state: "initial" };

  private friendsService = inject(FriendsService)

  ngOnInit() {
    this.currentState = { state: "loading" };
    this.friendsService.getAll().then((response) => {
          if (Array.isArray(response)) {
            this.currentState = {
              state: "success",
              result: response,
            };
          } else {
            this.currentState = {
              state: "error",
              error: response,
            };
          }
        });
      }  

  createNewName(name: string, friends: Friend[]) {
    this.friendsService.add(name).then((response) => {
      if ("id" in response) {
        this.currentState = {
          state: "success",
          result: friends.concat(response),
        };
      }else {
        alert(response.message);
      }
    });
  }
}
