import {Component, inject, WritableSignal} from '@angular/core';
import {InitiativeService} from '../../services/initiative.service';
import {TrackedEntry} from '../../models/tracked-entry';
import {MatDialog} from '@angular/material/dialog';
import {AddTrackedEntryComponent} from '../dioalogs/add-tracked-entry/add-tracked-entry.component';

@Component({
  selector: 'app-initiative-tracker',
  standalone: false,
  templateUrl: './initiative-tracker.component.html',
  styleUrl: './initiative-tracker.component.scss'
})
export class InitiativeTrackerComponent {
  dialog = inject(MatDialog);
  protected _entries: Array<WritableSignal<TrackedEntry>> = [];
  initiativeService = inject(InitiativeService);

  constructor() {
    this._entries = this.initiativeService.entries
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
}
