import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TimelineListComponent } from '../components/timeline/timeline-list/timeline-list.component';
import { GameComponent } from '../game/game/game.component';
import { CardManagerComponent} from '../components/card/card-manager/card-manager.component';

const appRouteList: Routes = [
  {
      path: 'timeline',
      component: TimelineListComponent
  },
  {
    path: 'card/:timelineId',
    component: CardManagerComponent
  },

  {
    path: 'card/:timelineId/:cardId',
    component: CardManagerComponent
  },
  {
      path: 'play/:timeline.id',
      component: GameComponent
  },
  {
      path: '**',
      redirectTo: 'timeline'
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
