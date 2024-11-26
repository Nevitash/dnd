import {Character} from './character';
import {v7 as uuid} from 'uuid';
import {Stats} from './stats';
import {TrackedStats} from './tracked-stats';

export class TrackedEntry {

  private _character?: Character;
  private _trackedStats: TrackedStats;
  private readonly _id: string = uuid();
  private _name: string;

  public constructor(name: string, character?: Character, stats?: TrackedStats) {
    this._name = name;
    this._character = character;
    this._trackedStats = stats ?? new TrackedStats();
  }

  public static buildWithCharacter(character: Character): TrackedEntry | undefined {
    if (!character) {
      return undefined;
    }
    const trackedStats = TrackedStats.buildWithCharacter(character);
    return new TrackedEntry(character.name, character, trackedStats);
  }

  public static buildWithStats(name: string, stats: Stats): TrackedEntry | undefined {
    if (!name) {
      return undefined;
    }
    const trackedStats = TrackedStats.buildWithStats(stats);
    return new TrackedEntry(name ?? 'Unknown', undefined, trackedStats);
  }

  get id(): string {
    return this._id;
  }

  get stats(): TrackedStats {
    return this._trackedStats;
  }

  set stats(value: TrackedStats) {
    this._trackedStats = value;
  }

  set character(value: Character) {
    this._character = value;
  }

  get character(): Character | undefined {
    return this._character;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  public static buildWithArgs({character, initiative, name}:
                                { character?: Character; initiative: number; name: string }): TrackedEntry {
    const trackedEntry: TrackedEntry = new TrackedEntry(name);
    trackedEntry.stats.initiative = initiative;
    if (character) {
      trackedEntry.character = character;
    }
    return trackedEntry;
  }


}




