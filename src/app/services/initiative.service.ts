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
  private _damageCalc: WritableSignal<boolean> = signal(false);

  _newRoundSubject = new Subject<void>();
  private _newRoundEvent$ = this._newRoundSubject.asObservable();

  constructor() {
  }

  clearTracker(): void {
    this._entries = [];
  }


  get damageCalc(): boolean {
    return this._damageCalc();
  }

  set damageCalc(value: boolean) {
    this._damageCalc.set(value);
  }

  addCharacter(character: Character): void {
    this.addTrackedEntry(TrackedEntry.buildWithCharacter(character)!);
  }

  addTrackedEntry(trackedEntry: TrackedEntry) {
    const number: number = this.determineNextNumber(this._entries, trackedEntry.name);
    trackedEntry.name = `${trackedEntry.name} ${number}`;
    let newEntrySignal = signal(trackedEntry);
    this._entries.push(newEntrySignal);
    if (this.phase === Phase.PREVIEW) {
      this._roundEntries.push(newEntrySignal)
    }
    this.sortEntries();
  }

  determineNextNumber(entries: Array<WritableSignal<TrackedEntry>>, name: string): number {
    const pattern = new RegExp(`^${name}\\s*(\\d*)$`);
    const highestNumber: number = entries
      .filter((entry) => entry().name.match(pattern))
      .reduce(
        (max, entry) => {
          const match = entry().name.match(pattern);
          const currentNumber = match && match[1] ? parseInt(match[1], 10) : 1;
          return currentNumber > max ? currentNumber : max;
        },
        0);
    return highestNumber + 1;
  }

  startNewRound() {
    this.phase = Phase.IN_ROUND;
    this.sortEntries();
    this.roundEntries = [...this.entries];
    this._newRoundSubject.next();
  }

  nextTurn(): WritableSignal<TrackedEntry> | null {
    //Start the round if we were in preview. Happens if we forgot to call startNewRound
    if (this.phase === Phase.PREVIEW) {
      this.startNewRound()
    }
    this.roundEntries.shift();
    if (this.roundEntries.length == 0) {
      this.startNewRound();
    }
    return this.roundEntries.at(0) ?? null;
  }

  sortEntries(): void {
    this._entries.sort((a, b) => this.sortEntriesFunction(a, b))
    this._roundEntries.sort((a, b) => this.sortEntriesFunction(a, b))
  }

  sortEntriesFunction(a: WritableSignal<TrackedEntry>, b: WritableSignal<TrackedEntry>): number {
    if (a().stats.initiative > b().stats.initiative) {
      return -1;
    }
    if (a().stats.initiative < b().stats.initiative) {
      return 1;
    }
    if (a().stats.initiative === b().stats.initiative && a().stats.initiativeMod > b().stats.initiativeMod) {
      return -1
    }
    if (a().stats.initiative === b().stats.initiative && a().stats.initiativeMod < b().stats.initiativeMod) {
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
