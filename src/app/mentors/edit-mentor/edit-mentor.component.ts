import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map, Subscription, catchError, of } from 'rxjs';
import { ToastService } from 'src/app/global/toast/toast.service';
import { Mentor, Team } from 'src/app/models';
import { MentorService, TeamService } from 'src/app/services';
import {
  allMentors,
  freeMentors,
  mentorById,
} from 'src/app/state/mentors/mentors.selector';
import { teamById } from 'src/app/state/teams/teams.selector';

@Component({
  selector: 'team',
  template: `<div class="card mt-4">
    <ng-container *ngIf="mentor$ | async as mentor">
      <div class="card-header">
        <h4>{{ mentor.name }}</h4>
        <button
          type="button"
          class="btn btn-primary"
          [routerLink]="['..']"
          form="edit-team"
        >
          View Team
        </button>
        <button
          type="button"
          class="btn btn-primary"
          (click)="submit()"
          form="edit-team"
        >
          Update Team
        </button>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="column">
            <form id="edit-team" [formGroup]="editMentorForm">
              <ul class="list-group">
                <li class="list-group-item">
                  <div>Name:</div>
                  <input
                    type="text"
                    formControlName="name"
                    class="form-control"
                  />
                </li>
                <li class="list-group-item">
                  <div>Username:</div>
                  <input
                    type="text"
                    formControlName="username"
                    class="form-control"
                  />
                </li>
                <li class="list-group-item">
                  <div>Password:</div>
                  <input
                    type="password"
                    formControlName="password"
                    class="form-control"
                  />
                </li>
                <li class="list-group-item">
                  <div>Assigned Team:</div>
                  <div>{{ mentor.assignedTeam }}</div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </ng-container>
  </div>`,
  styleUrls: ['edit-mentor.component.css'],
})
export class EditMentorComponent {
  mentors$ = this.store.select(allMentors);
  mentor: Mentor;
  editMentorForm: FormGroup;
  teamSub: Subscription;
  mentorValues: Mentor;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private teamService: TeamService,
    private fb: FormBuilder,
    private mentorService: MentorService
  ) {
    this.teamService.getTeamDetails(route.snapshot.params['id']);

    this.teamSub = this.mentor$.subscribe((mentor) => {
      this.editMentorForm = fb.group({
        _id: [mentor?._id],
        name: [mentor?.name],
        username: [mentor?.username],
        password: [mentor?.password],
        assignedTeam: [mentor?.assignedTeam],
      });
    });
  }

  mentor$ = this.route.params.pipe(
    switchMap((p) =>
      this.store.pipe(
        select(mentorById, p['id']),
        map((mentor) => {
          if (p['id'] && !mentor) {
            return null;
          }
          this.mentor = mentor!;
          return mentor ?? ({} as Mentor);
        })
      )
    )
  );

  submit() {
    this.editMentorForm.markAllAsTouched();
    if (this.editMentorForm.valid) {
      let formValues = this.editMentorForm.getRawValue();
      let result$ = this.mentorService.updateMentor(formValues);
      result$
        .pipe(
          catchError((err) => {
            return of({
              errorMessage: 'Updating the mentor failed',
              err,
            });
          })
        )
        .subscribe((result: any) => {
          if (result.errorMessage) {
            console.log(result.errorMessage);
            this.toastService.danger({
              text: 'Failed to update mentor',
            });
          } else {
            this.toastService.success({
              text: 'Mentor Updated',
            });
          }
        });

      this.editMentorForm.reset();
      this.router.navigateByUrl('mentors/' + this.mentor._id);
    }
  }
}
