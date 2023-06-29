import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { Mentor } from 'src/app/models';
import { MentorService } from 'src/app/services';
import { mentorById } from 'src/app/state/mentors/mentors.selector';

@Component({
  selector: 'mentor',
  template: `<div class="card mt-4">
    <ng-container *ngIf="mentor$ | async as mentor">
      <div class="card-header">
        <h4>{{ mentor.name }}</h4>
        <button type="button" class="btn btn-primary" [routerLink]="['edit']">
          Change Mentor Details
        </button>
        <button type="button" class="btn btn-primary" (click)="removeMentor()">
          Remove Mentor
        </button>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="column">
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
                <div>{{ mentor.assignedTeam }}</div>
              </li>
            </ul>
          </div>
        </div>
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
    private router: Router
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
    console.log('Remove Mentor');
    this.mentorService.removeMentor(this.mentor._id);

    this.router.navigateByUrl('/mentors');
  }
}
