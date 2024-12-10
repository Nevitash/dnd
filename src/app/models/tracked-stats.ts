import {Character} from './character';
import {Stats} from './stats';
import {RollUtil} from '../utils/rollUtil';

export class TrackedStats {
  private _initiative: number = 0;
  private _initiativeMod: number = 0;
  private _ac: number = 10;
  private _maxHp!: number;
  private _currentHp!: number;

  constructor(initiative: number, hp: number) {
    this._initiative = initiative;
    this._maxHp = hp;
    this._currentHp = hp;
  }

  public static buildWithCharacter(character: Character): TrackedStats | null {
    return character ? this.buildWithStats(character.stats) : null;
  }

  public static buildWithStats(stats: Stats): TrackedStats {
    const initiative: number = RollUtil.rollD20() + stats.initiativeModifier();
    const maxHp = stats.maxHp() ?? 1;
    return new TrackedStats(initiative, maxHp);
  }

  get initiative(): number {
    return this._initiative;
  }

  set initiative(value: number) {
    this._initiative = value;
  }

  get initiativeMod(): number {
    return this._initiativeMod;
  }

  set initiativeMod(value: number) {
    this._initiativeMod = value;
  }

  set ac(value: number) {
    this._ac = value;
  }

  get ac(): number {
    return this._ac;
  }

  get maxHp(): number {
    return this._maxHp;
  }

  set maxHp(value: number) {
    this._maxHp = value;
  }

  get currentHp(): number {
    return this._currentHp;
  }

  set currentHp(value: number) {
    this._currentHp = value;
  }
}
