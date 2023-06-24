import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'toast-container',
  template: `<ngb-toast
    *ngFor="let toast of toastService.toasts"
    [class]="toast.classname"
    [autohide]="true"
    [delay]="toast.delay || 5000"
    (hidden)="toastService.remove(toast)"
  >
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
      <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
    </ng-template>

    <ng-template #text>{{ toast.textOrTpl }}</ng-template>
  </ngb-toast> `,
  styles: [
    `
      :host {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 1000;
        padding: 10px;
      }

      @keyframes slideIn {
        from {
          top: 30px;
          opacity: 0;
        }
        to {
          top: 0;
          opacity: 1;
        }
      }

      ngb-toast {
        position: relative;
        animation-name: slideIn;
        animation-duration: 0.5s;
      }
    `,
  ],
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
