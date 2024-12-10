import {Character} from './character';
import {v7 as uuid} from 'uuid';
import {Stats} from './stats';
import {TrackedStats} from './tracked-stats';
import {Attribute} from './dto/attribute';
import {TrackedAttribute} from '../enums/tracked-attribute';

export class TrackedEntry {

  private _character?: Character;
  private _trackedStats: TrackedStats;
  private readonly _id: string = uuid();
  private _name: string;
  private _image?: File;

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


  get image(): File | undefined {
    return this._image;
  }

  set image(value: File | undefined) {
    this._image = value;
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

  set character(value: Character | undefined) {
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

  public static buildWithArgs({character, attributes, name, image}:
                                { character?: Character; attributes: Array<Attribute>; name: string; image?: File }): TrackedEntry {
    const trackedEntry: TrackedEntry = new TrackedEntry(name);
    for(const attribute of attributes) {
      switch (attribute.name) {
        case TrackedAttribute.INITIATIVE:
          trackedEntry.stats.initiative = attribute.value;
          trackedEntry.stats.initiativeMod = attribute.modifier ?? 0;
          break;
        case TrackedAttribute.AC:
          trackedEntry.stats.ac = attribute.value;
      }
    }
    trackedEntry.character = character ?? undefined;
    trackedEntry.image = image ?? undefined;
    return trackedEntry;
  }


}




