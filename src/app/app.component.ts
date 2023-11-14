import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FriendsListPageComponent } from "./friends-list.page.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, FriendsListPageComponent],
    template: `
    <h1>My friends list</h1>
    <main>
      <app-friends-list-page />
    </main>
  `,
    styles: [],
})
export class AppComponent {
  title = "angular_02_friends";
}
