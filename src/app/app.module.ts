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
import {AddTrackedEntryComponent} from './components/dioalogs/add-tracked-entry/add-tracked-entry.component';
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

@NgModule({
  declarations: [
    AppComponent,
    InitiativeTrackerComponent,
    InitiativeTrackerEntryComponent,
    AddTrackedEntryComponent
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
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
