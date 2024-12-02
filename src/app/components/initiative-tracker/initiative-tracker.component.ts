import {Component, inject, OnDestroy, OnInit, WritableSignal} from '@angular/core';
import {InitiativeService} from '../../services/initiative.service';
import {TrackedEntry} from '../../models/tracked-entry';
import {MatDialog} from '@angular/material/dialog';
import {AddTrackedEntryComponent} from '../dialogs/add-tracked-entry/add-tracked-entry.component';
import {Phase} from '../../enums/phase';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-initiative-tracker',
  standalone: false,
  templateUrl: './initiative-tracker.component.html',
  styleUrl: './initiative-tracker.component.scss'
})
export class InitiativeTrackerComponent implements OnInit, OnDestroy {
  initiativeService = inject(InitiativeService);

  _entries: Array<WritableSignal<TrackedEntry>> = [];
  _roundEntries: Array<WritableSignal<TrackedEntry>> = [];

  dialog = inject(MatDialog);


  private _newTurnSubscription?: Subscription;

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
    this.initiativeService.startNewRound();
    this._roundEntries = this.initiativeService.roundEntries;
    //TODO trigger a animation to indicate new round
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
    dialogRef.afterClosed().subscribe((result: TrackedEntry) => {
      this.addCharacter(result)
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

  protected readonly Phase = Phase;

  nestTurn() {
    this.initiativeService.nextTurn()
  }
}
