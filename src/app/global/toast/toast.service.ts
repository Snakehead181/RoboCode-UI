import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(options: ToastOptions) {
    this.toasts.push({
      textOrTpl: options.text,
      classname: options.cssClass,
      delay: options.delay,
    });
  }

  success(options: ToastOptions) {
    this.show({
      ...options,
      cssClass: 'bg-success text-light',
    });
  }

  warning(options: ToastOptions) {
    this.show({
      ...options,
      cssClass: 'bg-warning text-light',
    });
  }

  danger(options: ToastOptions) {
    this.show({
      ...options,
      cssClass: 'bg-danger text-light',
    });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}

export interface ToastOptions {
  text: string;
  cssClass?: string;
  delay?: number;
}
