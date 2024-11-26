import {Stats} from './stats';

export class Character {
  private _stats:Stats = new Stats();

  constructor(private _name: string) {}


  get stats(): Stats {
    return this._stats;
  }

  set stats(value: Stats) {
    this._stats = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}


