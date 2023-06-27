import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map, Subscription, catchError, of } from 'rxjs';
import { ToastService } from 'src/app/global/toast/toast.service';
import { Team } from 'src/app/models';
import { TeamService } from 'src/app/services';
import { freeMentors } from 'src/app/state/mentors/mentors.selector';
import { teamById } from 'src/app/state/teams/teams.selector';

@Component({
  selector: 'team',
  template: `<div class="card mt-4">
    <ng-container *ngIf="team$ | async as team">
      <div class="card-header">
        <h4>{{ team.name }}</h4>
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
            <form id="edit-team" [formGroup]="editTeamForm">
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
                  <div>Table Number:</div>
                  <input
                    type="text"
                    formControlName="tableNumber"
                    class="form-control"
                  />
                </li>
                <li class="list-group-item">
                  <div>Color:</div>
                  <input
                    type="text"
                    formControlName="color"
                    class="form-control"
                  />
                </li>
                <li class="list-group-item">
                  <div>Assigned Mentor:</div>
                  <select
                    id="assignedMentor"
                    class="form-select"
                    formControlName="assignedMentor"
                  >
                    <option value="null">Change Mentor</option>
                    <option
                      *ngFor="let freeMentor of freeMentors$ | async"
                      [ngValue]="freeMentor.name"
                    >
                      {{ freeMentor.name }}
                    </option>
                  </select>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </ng-container>
  </div>`,
  styleUrls: ['edit-team.component.css'],
})
export class EditTeamComponent {
  freeMentors$ = this.store.select(freeMentors);
  team: Team;
  editTeamForm: FormGroup;
  teamSub: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private teamService: TeamService,
    private fb: FormBuilder
  ) {
    this.teamSub = this.team$.subscribe((team) => {
      this.editTeamForm = fb.group({
        name: [team?.name],
        tableNumber: [team?.tableNumber],
        color: [team?.color],
        score: [team?.score],
        assignedMentor: [team?.assignedMentor],
      });
    });
  }

  team$ = this.route.params.pipe(
    switchMap((p) =>
      this.store.pipe(
        select(teamById, p['id']),
        map((team) => {
          if (p['id'] && !team) {
            return null;
          }
          this.team = team!;
          return team ?? ({} as Team);
        })
      )
    )
  );

  removeTeam() {
    console.log(this.team._id);
    this.teamService.removeTeam(this.team._id);
    this.router.navigateByUrl('/teams');
  }

  updateTeamDisplay() {}

  submit() {
    this.editTeamForm.markAllAsTouched();
    if (this.editTeamForm.valid) {
      let formValues = this.editTeamForm.getRawValue();
      let result$ = this.teamService.updateTeam(this.team._id, formValues);
      result$
        .pipe(
          catchError((err) => {
            return of({
              errorMessage: 'Updating the team failed',
              err,
            });
          })
        )
        .subscribe((result: any) => {
          if (result.errorMessage) {
            console.log(result.errorMessage);
            this.toastService.danger({
              text: 'Failed to update team',
            });
          } else {
            this.toastService.success({
              text: 'Team Updated',
            });
          }
        });
      this.editTeamForm.reset();
      this.router.navigateByUrl('teams/' + this.team._id);
    }
  }
}
