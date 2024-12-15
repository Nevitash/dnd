import {Character} from './character';
import {Stats} from './stats';
import {RollUtil} from '../utils/rollUtil';
import {signal, WritableSignal} from '@angular/core';

export class TrackedStats {
  private _initiative: number = 0;
  private _initiativeMod: number = 0;
  private _ac: number = 10;
  private _maxHp: WritableSignal<number | undefined> = signal(undefined);
  private _currentHp: WritableSignal<number | undefined> = signal(undefined);

  constructor() {

  }

  public static buildWithCharacter(character: Character): TrackedStats | null {
    return character ? this.buildWithStats(character.stats) : null;
  }

  public static buildWithStats(stats: Stats): TrackedStats {
    const initiative: number = RollUtil.rollD20() + stats.initiativeModifier();
    const maxHp: WritableSignal<number | undefined> = stats.maxHp() ? stats.maxHp : signal(undefined);
    const currentHp: WritableSignal<number | undefined> = stats.currentHp() ? stats.currentHp : signal(undefined);

    let trackedStats = new TrackedStats();
    trackedStats.initiative = initiative;
    trackedStats.maxHpSignal = maxHp;
    trackedStats.currentHpSignal = currentHp;
    return trackedStats;
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

  get maxHp(): number | undefined {
    return this._maxHp ? this._maxHp() : undefined;
  }

  set maxHp(value: number) {
    if(!this._maxHp){
      this._maxHp = signal(1);
    }
    this._maxHp.set(value);
  }

  get currentHp(): number | undefined {
    return this._currentHp ? this._currentHp() : undefined;
  }

  set currentHp(value: number) {
    if(!this._currentHp){
      this._currentHp = signal(1);
    }
    this._currentHp.set(value);
  }

  get maxHpSignal(): WritableSignal<number | undefined> {
    return this._maxHp;
  }

  set maxHpSignal(value: WritableSignal<number | undefined>) {
    this._maxHp = value;
  }

  get currentHpSignal(): WritableSignal<number | undefined> {
    return this._currentHp;
  }

  set currentHpSignal(value: WritableSignal<number | undefined>) {
    this._currentHp = value;
  }
}
