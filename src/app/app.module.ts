import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InitiativeTrackerComponent} from './components/initiative-tracker/initiative-tracker.component';
import {
  InitiativeTrackerEntryComponent
} from './components/initiative-tracker-entry/initiative-tracker-entry.component';
import {MatList, MatListItem, MatListItemTitle} from '@angular/material/list';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';
import {AddTrackedEntryComponent} from './components/dialogs/add-tracked-entry/add-tracked-entry.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogContainer, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {
  AttributeWithModifierComponent
} from './components/inputs/attribute-with-modifier/attribute-with-modifier.component';
import {ImageUploadComponent} from './components/inputs/image-upload/image-upload.component';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {NgOptimizedImage} from '@angular/common';
import {DragScrollComponent, DragScrollItemDirective} from 'ngx-drag-scroll';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatTooltip} from '@angular/material/tooltip';
import {NgIconsModule} from '@ng-icons/core';
import {gamePerspectiveDiceSixFacesSix} from '@ng-icons/game-icons'
import {MatDivider} from "@angular/material/divider";
import {GLOBAL_STATE} from './store/app.state';
import {rxState} from '@rx-angular/state';
import {AppState} from './store/app.state';
import {PhaseEffects} from './store/effects/PhaseEffects';

@NgModule({
  declarations: [
    AppComponent,
    InitiativeTrackerComponent,
    InitiativeTrackerEntryComponent,
    AddTrackedEntryComponent,
    AttributeWithModifierComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatList,
    MatIcon,
    MatFabButton,
    MatIconModule,
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogContainer,
    MatButton,
    MatGridList,
    MatGridTile,
    MatListItem,
    MatListItemTitle,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule,
    MatCard,
    MatCardImage,
    MatCardContent,
    NgOptimizedImage,
    DragScrollComponent,
    DragScrollItemDirective,
    MatSlider,
    MatSliderThumb,
    MatSlideToggle,
    MatTooltip,
    NgIconsModule.withIcons({gamePerspectiveDiceSixFacesSix}),
    MatDivider
  ],
  providers: [
    {
      provide: GLOBAL_STATE, useFactory: () => rxState<AppState>(),
    },
    PhaseEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
