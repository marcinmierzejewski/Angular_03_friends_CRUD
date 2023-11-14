import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FriendsListComponent } from "./friends-list.component";
import { Friend } from "./Friend";

type ListFetchingError = { status: number; message: string };

type InitialState = {
  state: "initial";
};

type LoadingState = {
  state: "loading";
};

type SuccessState = {
  state: "success";
  result: Friend[];
};

type ErrorState = {
  state: "error";
  error: ListFetchingError;
};

type ComponentListState =
  | InitialState
  | LoadingState
  | SuccessState
  | ErrorState;

@Component({
  selector: "app-friends-list-page",
  standalone: true,
  imports: [CommonModule, FriendsListComponent],

  template: `
    <app-friends-list
      *ngIf="currentState.state === 'success'"
      [friends]="currentState.result"
    />
    <p *ngIf="currentState.state === 'loading'">Loading...</p>
    <p *ngIf="currentState.state ==='error'">{{ currentState.error.message }}</p>
  `,
  styles: [],
})
export class FriendsListPageComponent {
  currentState: ComponentListState = { state: "initial" };

  private readonly URL = "http://localhost:3000";

  constructor() {
    this.currentState = { state: "loading" };
    fetch(`${this.URL}/friends`)
      .then<Friend[] | ListFetchingError>((response) => {
        if (response.ok) {
          return response.json();
        }

        return { status: response.status, message: response.statusText };
      })
      .then((response) => {
        setTimeout(() => {
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
        }, 1200);
      });
  }
}
