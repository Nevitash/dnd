import {TrackedEntry} from '../models/tracked-entry';
import {signal, WritableSignal} from '@angular/core';
import {Phase} from '../enums/phase';
import _ from 'lodash';

export class TrackerUtility {
  static addTrackedEntry(entries: TrackedEntry[], newEntry: TrackedEntry): TrackedEntry[] {
    newEntry.name = TrackerUtility.determineUniqueName(entries, newEntry.name);
    entries.push(newEntry);
    return TrackerUtility.sortEntries(entries);
  }

  static determineUniqueName(entries: TrackedEntry[], name: string): string {
    const number: number = TrackerUtility.determineNextNumber(entries, name);
    return `${name} ${number}`;
  }

  static sortEntriesFunction(a: TrackedEntry, b: TrackedEntry): number {
    if (a.stats.initiative > b.stats.initiative) {
      return -1;
    }
    if (a.stats.initiative < b.stats.initiative) {
      return 1;
    }
    if (a.stats.initiative === b.stats.initiative && a.stats.initiativeMod > b.stats.initiativeMod) {
      return -1
    }
    if (a.stats.initiative === b.stats.initiative && a.stats.initiativeMod < b.stats.initiativeMod) {
      return 1;
    }
    return 0;
  }
  static determineNextNumber(entries: TrackedEntry[], name: string): number {
    const pattern = new RegExp(`^${name}\\s*(\\d*)$`);
    const highestNumber: number = entries
      .filter((entry) => entry.name.match(pattern))
      .reduce(
        (max, entry) => {
          const match = entry.name.match(pattern);
          const currentNumber = match && match[1] ? parseInt(match[1], 10) : 1;
          return currentNumber > max ? currentNumber : max;
        },
        0);
    return highestNumber + 1;
  }

  static sortEntries(entries: TrackedEntry[]): TrackedEntry[] {
    entries.sort((a, b) => this.sortEntriesFunction(a, b));
    return entries;
  }


  static removeEntry(entries: TrackedEntry[], trackedEntry?: TrackedEntry, name?: string) {
    const key = trackedEntry?.name ?? name;
    let index = entries.findIndex(entry => entry.name === key);
    if (index !== -1) {
      entries.splice(index, 1);
    }
    return entries;
  }

  static updateEntry(entries: TrackedEntry[], key: string, updatedEntry: Partial<TrackedEntry>) {
    let index: number = entries.findIndex((entry) => entry.name === key);
    if(index > -1) {
      entries[index] = TrackerUtility.updateEntryData(entries[index], updatedEntry);
    }
    return entries;
  }

  private static updateEntryData(foundEntry: TrackedEntry, updatedEntry: Partial<TrackedEntry>): TrackedEntry {
    let newEntry = _.cloneDeep(foundEntry);
    newEntry.name = updatedEntry.name ?? newEntry.name;
    newEntry.character = updatedEntry.character ?? newEntry.character;
    newEntry.image = updatedEntry.image ?? newEntry.image;
    newEntry.stats = updatedEntry.stats ?? newEntry.stats;
    return foundEntry;
  }
}
