import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TimelineListComponent } from './components/timeline/timeline-list/timeline-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import { GameComponent } from './game/game/game.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardManagerComponent } from './components/card/card-manager/card-manager.component';
import { TimelineManagerComponent } from './components/timeline/timeline-manager/timeline-manager.component';
import { CardListComponent } from './components/card/card-list/card-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TimelineListComponent,
    GameComponent,
    CardManagerComponent,
    TimelineManagerComponent,
    CardListComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DemoMaterialModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
