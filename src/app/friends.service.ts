import { Injectable } from "@angular/core";
import { Friend } from "./Friend";
import { ListFetchingError } from "./list-state.type";
import { wait } from "./wait";

@Injectable({
  providedIn: "root",
})
export class FriendsService {
  private URL = "http://localhost:3000";
  private UserImg = 123;

  async getAll() {
    await wait();

    return fetch(`${this.URL}/friends`).then<Friend[] | ListFetchingError>((response) => {
      if (response.ok) {
        return response.json();
      }

      return { status: response.status, message: response.statusText };
    });
  }

  async delete(friendId: number) {
    fetch(`${this.URL}/friends/${friendId}`, {
      method: "DELETE",
    }).then<Error | undefined>((response) => {
      if (response.ok) {
        return response.json();
      }

      return new Error("Cant delete friend");
    });
  }

  async update(friendId: number, name: string) {
    return fetch(`${this.URL}/friends/${friendId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then<Friend | Error>((response) => {
      if (response.ok) {
        return response.json();
      }

      return new Error("Cant update friend");
    });
  }

  async add(name: string) {
    await wait();    
    this.UserImg = Math.floor(Math.random() * (999 - 111 + 1) + 111)

    return fetch(`${this.URL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `https://cdn-icons-png.flaticon.com/512/2977/2977${this.UserImg}.png`,
        name,
        isOnline: false,
      } as Friend),
    }).then<Friend | Error>((response) => {
      if (response.ok) {
        return response.json();
      }

      return new Error("Cant add friend");
    });
  }
}
