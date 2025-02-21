import {Component, inject, OnDestroy, OnInit, WritableSignal} from '@angular/core';
import {InitiativeService} from '../../services/initiative.service';
import {TrackedEntry} from '../../models/tracked-entry';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddTrackedEntryComponent} from '../dialogs/add-tracked-entry/add-tracked-entry.component';
import {Phase} from '../../enums/phase';
import {Subscription} from 'rxjs';
import {MatList} from '@angular/material/list';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatLabel} from '@angular/material/form-field';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatDivider} from '@angular/material/divider';
import {InitiativeTrackerEntryComponent} from '../initiative-tracker-entry/initiative-tracker-entry.component';
import {MatFabButton} from '@angular/material/button';
import {NgIconsModule} from '@ng-icons/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-initiative-tracker',
  standalone: true,
  templateUrl: './initiative-tracker.component.html',
  imports: [
    MatList,
    NgClass,
    MatIcon,
    MatLabel,
    MatSlideToggle,
    FormsModule,
    MatDivider,
    InitiativeTrackerEntryComponent,
    MatFabButton,
    MatDialogModule,
    NgIconsModule,
    BrowserAnimationsModule
  ],
  styleUrl: './initiative-tracker.component.scss'
})
export class InitiativeTrackerComponent implements OnInit, OnDestroy {
  initiativeService = inject(InitiativeService);

  _entries: Array<WritableSignal<TrackedEntry>> = [];
  _roundEntries: Array<WritableSignal<TrackedEntry>> = [];

  dialog = inject(MatDialog);


  private _newTurnSubscription?: Subscription;

  protected readonly Phase = Phase;

  get damageCalc(): boolean {
    return this.initiativeService.damageCalc;
  }

  set damageCalc(value: boolean) {
    this.initiativeService.damageCalc = value;
  }

  constructor() {
    this._entries = this.initiativeService.entries
    this._roundEntries = this.initiativeService.roundEntries;
  }

  ngOnDestroy(): void {
    if (this._newTurnSubscription) {
      this._newTurnSubscription.unsubscribe();
    }
  }

  handleNewRound() {
    this._roundEntries = this.initiativeService.roundEntries;
    //TODO trigger a animation to indicate new round
  }

  startNewRound() {
    this.initiativeService.startNewRound();
  }

  ngOnInit(): void {
    this._newTurnSubscription = this.initiativeService.newRoundEvent$.subscribe(() => {
      this.handleNewRound();
    });
  }

  editEntry(entry: WritableSignal<TrackedEntry>) {

  }

  addCharacterClick() {
    let dialogRef = this.dialog.open(
      AddTrackedEntryComponent,
    );
    dialogRef.afterClosed().subscribe((result: TrackedEntry[]) => {
      for (let entry of result) {
        this.addCharacter(entry);
      }
    });
  }

  private addCharacter(result?: TrackedEntry) {
    if (!result) {
      return;
    }
    this.initiativeService.addTrackedEntry(result)
  }

  get phase(): Phase {
    return this.initiativeService.phase;
  }



  nextTurn() {
    this.initiativeService.nextTurn()
  }

  removeEntry(trackedEntry: TrackedEntry) {
    this.initiativeService.removeEntryFromAll(trackedEntry);
  }
}
