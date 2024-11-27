import {Injectable, signal, WritableSignal} from '@angular/core';
import {Character} from '../models/character';
import {TrackedEntry} from '../models/tracked-entry';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {
  get entries(): Array<WritableSignal<TrackedEntry>> {
    return this._entries;
  }
  private _entries: Array<WritableSignal<TrackedEntry>> = [];

  constructor() { }

  clearTracker(): void {
    this._entries = [];
  }

  addCharacter(character: Character): void {
   this.addTrackedEntry(TrackedEntry.buildWithCharacter(character)!);
  }

  addTrackedEntry(trackedEntry: TrackedEntry) {
    this._entries.push(signal(trackedEntry));
    this.sortEntries();
  }

  sortEntries(): void {
    this._entries.sort((a,b) => this.sortEntriesFunction(a,b))
  }

  sortEntriesFunction(a: WritableSignal<TrackedEntry>, b: WritableSignal<TrackedEntry>): number {
    if(a().stats.initiative > b().stats.initiative) {
      return -1;
    }
    if(a().stats.initiative < b().stats.initiative) {
      return 1;
    }
    if(a().stats.initiative === b().stats.initiative && a().stats.initiativeMod > b().stats.initiativeMod) {
      return -1
    }
    if(a().stats.initiative === b().stats.initiative && a().stats.initiativeMod < b().stats.initiativeMod) {
      return 1;
    }
    return 0;
  }



}
