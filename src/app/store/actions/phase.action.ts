import { Injectable } from '@angular/core';
import { Phase } from '../../enums/phase';
import { rxActions } from '@rx-angular/state/actions';

@Injectable({ providedIn: 'root' })
export class PhaseActions {
  actions = rxActions<{
    toPreview: {},
    toInRound: { },
    toPhase: { phase: Phase }
  }>();
}
