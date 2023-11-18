import { Component, EventEmitter, Output } from "@angular/core";
import { NgIf } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  featherTrash2,
  featherUser,
  featherCheck,
  featherX,
} from "@ng-icons/feather-icons";

@Component({
  selector: "app-remove-item-button",
  standalone: true,
  imports: [NgIf, NgIconComponent],
  viewProviders: [
    provideIcons({ featherTrash2, featherUser, featherCheck, featherX }),
  ],
  template: `
    <div 
    (click)="isRemoveMode && $event.stopPropagation()"
      class="flex items-center rounded-md"
      [class.bg-red-700]="isRemoveMode"
      [class.text-white]="isRemoveMode"
      >
      <span
        class="text-sm transition-transform duration-300 h-full py-2 pl-2 rounded-md font-semibold"
        [class.invisible]="!isRemoveMode"
        [class.-translate-x-6]="isRemoveMode"
        [class.bg-red-700]="isRemoveMode"
        >Are you sure?</span
      >
      <button
        *ngIf="!isRemoveMode"
        (click)="isRemoveMode = true; $event.stopPropagation()"
        class="flex hover:bg-white hover:rounded-full"
      >
        <ng-icon name="featherTrash2" class="icon--hover" />
      </button>

      <button
        *ngIf="isRemoveMode"
        (click)="isRemoveMode = false; $event.stopPropagation()"
        class="flex mr-1"
      >
        <ng-icon name="featherX" class="hover:bg-white icon--hover" />
      </button>

      <button
        *ngIf="isRemoveMode"
        (click)="deleteItem.emit(); isRemoveMode = false; $event.stopPropagation()"
        class="flex pr-2"
      >
        <ng-icon name="featherCheck" class="hover:bg-white icon--hover" />
      </button>
    </div>
  `,
  styles: [
    `
      .icon--hover {
        @apply hover:text-red-700 hover:rounded-full;
      }
    `,
  ],
})
export class RemoveItemButtonComponent {
  @Output() deleteItem = new EventEmitter<void>();

  isRemoveMode = false;
}
