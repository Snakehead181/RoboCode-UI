import { Component, Input } from '@angular/core';
import { Team } from 'src/app/models';

@Component({
  selector: 'team-display',
  template: ` <ng-container
      *ngIf="data; then allTeams; else singleTeam"
    ></ng-container>

    <ng-template #allTeams>
      <div id="profile">
        <div class="row">
          <div class="column">
            <div class="flex reversed" *ngFor="let team of getTopFive()">
              <div class="item">
                <tank tankColor="{{ team.color }}"></tank>
                <div class="info reversed">
                  <div class="name">{{ team.name }}</div>
                  <span class="team-number">Table {{ team.tableNumber }}</span>
                </div>
              </div>
              <div class="item reversed">
                <span>{{ team.score }}</span>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="flex" *ngFor="let team of getTopFive()">
              <div class="item">
                <tank tankColor="{{ team.color }}"></tank>
                <div class="info ">
                  <div class="name">{{ team.name }}</div>
                  <span class="team-number">Table {{ team.tableNumber }}</span>
                </div>
              </div>
              <div class="item">
                <span>{{ team.score }}</span>
              </div>
            </div>
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
  styles: [
    `
      .column {
        float: left;
        width: 50%;
      }

      .reversed {
        transform: scale(-1, 1);
      }

      .rtl {
        direction: rtl;
      }
    `,
  ],
})
export class TeamDisplayComponent {
  @Input()
  data?: Team[];

  @Input()
  team?: Team;

  constructor() {}

  getTopFive() {
    return this.data?.slice(0, 5)!;
  }

  getLastFive() {
    return this.data?.slice(5, 10);
  }
}
