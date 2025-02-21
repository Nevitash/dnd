import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InitiativeTrackerComponent} from './components/initiative-tracker/initiative-tracker.component';
import {NgIconsModule} from '@ng-icons/core';
import {gamePerspectiveDiceSixFacesSix} from '@ng-icons/game-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InitiativeTrackerComponent,
    NgIconsModule.withIcons({gamePerspectiveDiceSixFacesSix}),
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
