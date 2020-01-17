import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';


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

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return 'some value';
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


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
        FlexLayoutModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: MyMissingTranslationHandler
        },
        useDefaultLang: false,
      })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
