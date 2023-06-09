import { NgModule } from '@angular/core';

import { MentorsComponent } from './mentors.component';
import { MentorComponent } from './mentor/mentor.component';
import { RegisterMentorComponent } from './register-mentor/register-mentor.component';
import { CommonModule } from '@angular/common';
import { MENTORS_ROUTES } from './mentors.routes';
import { MentorService } from '../services';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EditMentorComponent } from './edit-mentor/edit-mentor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MENTORS_ROUTES),
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    MentorsComponent,
    MentorComponent,
    RegisterMentorComponent,
    EditMentorComponent,
  ],
  providers: [MentorService],
})
export class MentorsModule {}
