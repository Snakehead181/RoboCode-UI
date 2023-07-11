import { Component, OnInit } from '@angular/core';
import { Subscription, map, share, timer } from 'rxjs';

@Component({
  selector: 'clock',
  template: `<div>{{ rxTime | date : 'hh:mm:ss a' }}</div>`,
})
export class ClockComponent implements OnInit {
  constructor() {}

  time = new Date();
  rxTime = new Date();
  subscription: Subscription;

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
