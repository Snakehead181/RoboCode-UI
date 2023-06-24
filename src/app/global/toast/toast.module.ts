import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from './toast.component';

@NgModule({
  imports: [CommonModule, NgbModule],
  exports: [ToastContainerComponent],
  declarations: [ToastContainerComponent],
})
export class ToastModule {}
