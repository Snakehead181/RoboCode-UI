import { NgModule } from '@angular/core';

import { TeamDisplayComponent } from './team-display.component';
import { TankComponent } from './tank.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [TeamDisplayComponent, TankComponent],
  declarations: [TeamDisplayComponent, TankComponent],
  providers: [],
})
export class GlobalComponentModule {}
