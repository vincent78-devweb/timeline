import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TimelineListComponent } from '../components/timeline/timeline-list/timeline-list.component';
import { GameComponent } from '../game/game/game.component';

const appRouteList: Routes = [
  {
      path: 'timeline',
      component: TimelineListComponent
  },
  {
      path: 'play',
      component: GameComponent
  },
  {
      path: '**',
      redirectTo: 'Timeline'
  }
];

@NgModule({
  declarations: [],
  exports: [
    RouterModule
],
  imports: [
    RouterModule.forRoot(appRouteList),
    CommonModule
  ]
})
export class AppRoutingModule { }
