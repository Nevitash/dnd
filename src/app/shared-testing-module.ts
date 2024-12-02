// shared-testing.module.ts
import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {MatList, MatListItem, MatListItemTitle, MatListModule} from '@angular/material/list';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogContainer, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {CdkAccordionModule} from "@angular/cdk/accordion";


@NgModule({
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
    MatDialogModule,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatListModule,
    CdkAccordionModule,
    MatExpansionPanel,
    MatExpansionModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    MatList,
    MatDialogModule,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatListModule,
    CdkAccordionModule,
    MatExpansionPanel,
    MatExpansionModule
  ]
})
export class SharedTestingModule {}
