import {TrackedEntry} from '../models/tracked-entry';
import {Phase} from '../enums/phase';
import {InjectionToken} from '@angular/core';
import {RxState} from '@rx-angular/state';

export interface AppState{
  phase: Phase;
  trackedEntries:TrackedEntry[];
  roundTrackedEntries:TrackedEntry[];
}

export const GLOBAL_STATE = new InjectionToken<RxState<AppState>>("GLOBAL_STATE");
