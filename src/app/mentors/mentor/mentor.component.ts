import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { Mentor } from 'src/app/models';
import { AuthenticationService, MentorService } from 'src/app/services';
import { mentorById } from 'src/app/state/mentors/mentors.selector';

@Component({
  selector: 'mentor',
  template: `<div class="card mt-4">
    <ng-container *ngIf="mentor$ | async as mentor">
      <div class="card-header">
        <h4>{{ mentor.name }}</h4>
        <ng-container *ngIf="getRole('ADMIN')">
          <button type="button" class="btn btn-primary" [routerLink]="['edit']">
            Edit
          </button>
          <button
            type="button"
            class="btn btn-primary"
            (click)="removeMentor()"
          >
            Remove
          </button>
        </ng-container>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">
            <div>Name:</div>
            <div>{{ mentor.name }}</div>
          </li>
          <li class="list-group-item">
            <div>Username:</div>
            <div>{{ mentor.username }}</div>
          </li>
          <li class="list-group-item">
            <div>Assigned Team:</div>
            <div>{{ mentor.assignedTeam.name }}</div>
          </li>
        </ul>
      </div>
    </ng-container>
  </div>`,
  styleUrls: ['mentor.component.css'],
})
export class MentorComponent implements OnInit {
  mentor: Mentor;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private mentorService: MentorService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.mentorService.getMentorDetails(this.route.snapshot.params['id']);
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

  ngOnInit() {}

  removeMentor() {
    this.mentorService.removeMentor(this.mentor._id);

    this.router.navigateByUrl('/mentors');
  }

  getRole(role) {
    return this.authService.checkRole(role);
  }
}
