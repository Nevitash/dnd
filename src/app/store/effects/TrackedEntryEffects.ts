import {inject, Injectable} from '@angular/core';
import {RxState} from '@rx-angular/state';
import {AppState} from '../app.state';


@Injectable({providedIn: 'root'})
export class TrackedEntryEffects {
  private _globalState: RxState<AppState> = inject(RxState<AppState>);

  constructor() {
    this.registerEffects(this._globalState);
  }

  private registerEffects(_globalState: RxState<AppState>) {

  }
}
