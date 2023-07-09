import { Route } from '@angular/router';

export const ACHIEVEMENTS_ROUTES: Route[] = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-view/admin-achievements.module').then(
        (m) => m.AdminAchievementsModule
      ),
  },
  {
    path: 'mentor',
    loadChildren: () =>
      import('./team-achievements/team-achievements.module').then(
        (m) => m.TeamAchievementsModule
      ),
  },
];
