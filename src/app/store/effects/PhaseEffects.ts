import {inject, Injectable} from '@angular/core';
import {RxState} from '@rx-angular/state';
import {AppState} from '../app.state';
import {rxEffects} from '@rx-angular/state/effects';
import {PhaseActions} from '../actions/phase.action';
import {Phase} from '../../enums/phase';

@Injectable({providedIn: 'root'})
export class PhaseEffects {
  private _globalState: RxState<AppState> = inject(RxState<AppState>);
  private _phaseActions: PhaseActions = inject(PhaseActions);

  constructor() {
    this.registerEffects(this._globalState);
  }

  private registerEffects(_globalState: RxState<AppState>) {
    rxEffects(({register}) => {
      register(
        this._phaseActions.actions.toPreview$,
        () => {
          this._globalState.set({phase: Phase.PREVIEW});
        });

      register(
        this._phaseActions.actions.toInRound$,
        () => {
          this._globalState.set({phase: Phase.IN_ROUND});
        });

      register(
        this._phaseActions.actions.toPhase$,
        ({phase}) => {
          this._globalState.set({phase});
        }
      );
    });
  }
}
