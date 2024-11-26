import {Character} from './character';
import {Stats} from './stats';

export class TrackedStats {
  private _initiative: number = 0;

  constructor(initiative: number = 0) {
    this._initiative = initiative;
  }

  public static buildWithCharacter(character: Character): TrackedStats {
    return character ? this.buildWithStats(character.stats) : new TrackedStats();
  }

  public static buildWithStats(stats: Stats): TrackedStats {
    const initiative = stats?.initiativeModifier() ?? 0;
    return new TrackedStats(initiative);
  }

  get initiative(): number {
    return this._initiative;
  }

  set initiative(value: number) {
    this._initiative = value;
  }
}
