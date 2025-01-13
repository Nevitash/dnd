import {Inject, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Character} from '../models/character';
import {TrackedEntry} from '../models/tracked-entry';
import {Phase} from '../enums/phase';
import {Observable, Subject} from 'rxjs';
import {AppState, GLOBAL_STATE} from '../store/app.state';

import {RxState} from '@rx-angular/state';
import {PhaseActions} from '../store/actions/phase.action';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {
  get entries(): TrackedEntry[] {
    return this._entries;
  }


  protected phaseActions: PhaseActions = inject(PhaseActions);
  private _entries: TrackedEntry[] = [];
  private _roundEntries: TrackedEntry[] = [];
  private _phase: Phase = Phase.PREVIEW;
  private _damageCalc: WritableSignal<boolean> = signal(false);
  @Inject(GLOBAL_STATE) private globalState!: RxState<AppState>;

  _newRoundSubject = new Subject<void>();
  private _newRoundEvent$ = this._newRoundSubject.asObservable();

  constructor() {
    // this.appStore.select(selectTrackedEntries).subscribe(entries => this._entries = entries);
    // this.appStore.select(selectRoundTrackedEntries).subscribe(entries => this._roundEntries = entries);
    // this.appStore.select(selectPhase).subscribe(phase => this._phase = phase);
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
    // this.appStore.dispatch(addTrackedEntry({trackedEntry: TrackedEntry.buildWithCharacter(character)!}));
  }

  addTrackedEntry(trackedEntry: TrackedEntry) {
    // this.appStore.dispatch(addTrackedEntry({trackedEntry}));
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
    if (this._entries.length <= 1) {
      return;
    }
    this.phaseActions.actions.toInRound({});
    this.sortEntries();
    this.roundEntries = [...this.entries];
    this._newRoundSubject.next();
  }

  nextTurn(): TrackedEntry | null {
    //Start the round if we were in preview. Happens if we forgot to call startNewRound
    if (this._entries.length <= 1) {
      return null;
    }
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

  sortEntriesFunction(a: TrackedEntry, b: TrackedEntry): number {
    if (a.stats.initiative > b.stats.initiative) {
      return -1;
    }
    if (a.stats.initiative < b.stats.initiative) {
      return 1;
    }
    if (a.stats.initiative === b.stats.initiative && a.stats.initiativeMod > b.stats.initiativeMod) {
      return -1
    }
    if (a.stats.initiative === b.stats.initiative && a.stats.initiativeMod < b.stats.initiativeMod) {
      return 1;
    }
    return 0;
  }


  get roundEntries(): TrackedEntry[] {
    return this._roundEntries;
  }

  set roundEntries(value: TrackedEntry[]) {
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

  removeEntryFromAll(trackedEntry: TrackedEntry) {
    // this.appStore.dispatch(removeTrackedEntry({trackedEntry: trackedEntry}));
  }
}
