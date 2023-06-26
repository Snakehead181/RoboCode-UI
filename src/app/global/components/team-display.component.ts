import { Component, Input } from '@angular/core';
import { Team } from 'src/app/models';

@Component({
  selector: 'team-display',
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
              <span class="team-number">Table {{ team.tableNumber }}</span>
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
              <span class="team-number">Table {{ team?.tableNumber }}</span>
            </div>
          </div>
          <div class="item">
            <span>{{ team?.score }}</span>
          </div>
        </div>
      </div>
    </ng-template>`,
})
export class TeamDisplayComponent {
  @Input()
  data?: Team[];

  @Input()
  team?: Team;

  constructor() {}
}
