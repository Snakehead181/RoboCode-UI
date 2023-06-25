import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../models';

@Component({
  selector: 'team-placement',
  template: ` <ng-container
      *ngIf="data; then allTeams; else singleTeam"
    ></ng-container>

    <ng-template #allTeams>
      <div id="profile">
        <div class="flex" *ngFor="let team of data">
          <div class="item">
            <tank tankColor="{{ team.color }}"></tank>
            <div class="info">
              <div class="name">{{ team.name }}</div>
              <span class="team-number">Team {{ team.number }}</span>
            </div>
          </div>
          <div class="item">
            <span>{{ team.score }}</span>
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template #singleTeam>
      <div id="profile" #singleTeam>
        <div class="flex">
          <div class="item">
            <tank tankColor="{{ team?.color }}"></tank>
            <div class="info">
              <div class="name">{{ team?.name }}</div>
              <span class="team-number">Team {{ team?.number }}</span>
            </div>
          </div>
          <div class="item">
            <span>{{ team?.score }}</span>
          </div>
        </div>
      </div>
    </ng-template>`,
})
export class TeamPlacementComponent {
  @Input()
  data?: Team[];

  @Input()
  team?: Team;

  constructor() {}
}
