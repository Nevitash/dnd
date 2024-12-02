import {Injectable, signal, WritableSignal} from '@angular/core';
import {Character} from '../models/character';
import {TrackedEntry} from '../models/tracked-entry';
import {Phase} from '../enums/phase';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {
  get entries(): Array<WritableSignal<TrackedEntry>> {
    return this._entries;
  }
  private _entries: Array<WritableSignal<TrackedEntry>> = [];
  private _roundEntries: Array<WritableSignal<TrackedEntry>> = [];
  private _phase: Phase = Phase.PREVIEW;

  _newRoundSubject = new Subject<void>();
  private _newRoundEvent$ = this._newRoundSubject.asObservable();

  constructor() { }

  clearTracker(): void {
    this._entries = [];
  }

  addCharacter(character: Character): void {
   this.addTrackedEntry(TrackedEntry.buildWithCharacter(character)!);
  }

  addTrackedEntry(trackedEntry: TrackedEntry) {
    let newEntry = signal(trackedEntry);
    this._entries.push(newEntry);
    if(this.phase === Phase.PREVIEW) {
      this._roundEntries.push(newEntry)
    }
    this.sortEntries();
  }

  startNewRound(){
    this.phase = Phase.IN_ROUND;
    this.sortEntries();
    this.roundEntries = [... this.entries];
    this._newRoundSubject.next();
  }

  nextTurn(): WritableSignal<TrackedEntry> | null {
    //Start the round if we were in preview. Happens if we forgot to call startNewRound
    if(this.phase === Phase.PREVIEW) {
      this.startNewRound()
    }
    this.roundEntries.shift();
    if(this.roundEntries.length == 0){
      this.startNewRound();
    }
    return this.roundEntries.at(0) ?? null;
  }

  sortEntries(): void {
    this._entries.sort((a,b) => this.sortEntriesFunction(a,b))
    this._roundEntries.sort((a, b) => this.sortEntriesFunction(a,b))
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


  get roundEntries(): Array<WritableSignal<TrackedEntry>> {
    return this._roundEntries;
  }

  set roundEntries(value: Array<WritableSignal<TrackedEntry>>) {
    this._roundEntries = value;
  }

  get phase(): Phase {
    return this._phase;
  }

  set phase(value: Phase) {
    this._phase = value;
  }

  get newRoundEvent$(): Observable<void> {
    return this._newRoundEvent$;
  }

  set newRoundEvent$(value: Observable<void>) {
    this._newRoundEvent$ = value;
  }
}
