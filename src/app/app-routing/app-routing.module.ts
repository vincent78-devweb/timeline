import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TimelineListComponent } from '../components/timeline/timeline-list/timeline-list.component';
import { TimelineManagerComponent } from '../components/timeline/timeline-manager/timeline-manager.component'; 
import { GameComponent } from '../game/game/game.component';

const appRouteList: Routes = [
  {
      path: 'timeline',
      component: TimelineListComponent
  },
  {
    path: 'timeline/:timeline.id',
    component: TimelineManagerComponent
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
