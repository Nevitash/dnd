import {computed, signal, Signal, WritableSignal} from '@angular/core';

export class Stats {
  get initiativeModifier(): Signal<number> {
    return this._initiativeModifier;
  }

  private _maxHp: WritableSignal<number | undefined> = signal(undefined);
  private _currentHp: WritableSignal<number | undefined> = signal(undefined);

  private _strength: WritableSignal<number> = signal(10);
  private _dexterity: WritableSignal<number> = signal(10);
  private _constitution: WritableSignal<number> = signal(10);
  private _wisdom: WritableSignal<number> = signal(10);
  private _intelligence: WritableSignal<number> = signal(10);
  private _charisma: WritableSignal<number> = signal(10);

  private _strengthModifier: Signal<number> = computed(() => Stats.computeModifier(this.strength)());
  private _dexterityModifier: Signal<number> = computed(() => Stats.computeModifier(this.dexterity)());
  private _constitutionModifier: Signal<number> = computed(() => Stats.computeModifier(this.constitution)());
  private _wisdomModifier: Signal<number> = computed(() => Stats.computeModifier(this.wisdom)());
  private _intelligenceModifier: Signal<number> = computed(() => Stats.computeModifier(this.intelligence)());
  private _charismaModifier: Signal<number> = computed(() => Stats.computeModifier(this.charisma)());
  private _initiativeModifier: Signal<number> = computed(() => Stats.computeModifier(this.dexterity)());

  get strength(): Signal<number> {
    return this._strength;
  }

  set strength(value: number) {
    this._strength.set(value);
  }

  get dexterity(): Signal<number> {
    return this._dexterity;
  }

  set dexterity(value: number) {
    this._dexterity.set(value);
  }

  get constitution(): Signal<number> {
    return this._constitution;
  }

  set constitution(value: number) {
    this._constitution.set(value);
  }

  get wisdom(): Signal<number> {
    return this._wisdom;
  }

  set wisdom(value: number) {
    this._wisdom.set(value);
  }

  get intelligence(): Signal<number> {
    return this._intelligence;
  }

  set intelligence(value: number) {
    this._intelligence.set(value);
  }

  get charisma(): Signal<number> {
    return this._charisma;
  }

  set charisma(value: number) {
    this._charisma.set(value);
  }

  get strengthModifier(): Signal<number> {
    return this._strengthModifier;
  }

  get dexterityModifier(): Signal<number> {
    return this._dexterityModifier;
  }

  get constitutionModifier(): Signal<number> {
    return this._constitutionModifier;
  }

  get wisdomModifier(): Signal<number> {
    return this._wisdomModifier;
  }

  get intelligenceModifier(): Signal<number> {
    return this._intelligenceModifier;
  }

  get charismaModifier(): Signal<number> {
    return this._charismaModifier;
  }

  get maxHp(): WritableSignal<number | undefined> {
    return this._maxHp;
  }

  set maxHp(value: WritableSignal<number | undefined>) {
    this._maxHp = value;
  }

  get currentHp(): WritableSignal<number | undefined> {
    return this._currentHp;
  }

  set currentHp(value: WritableSignal<number | undefined>) {
    this._currentHp = value;
  }

  public static computeModifier(value: Signal<number>): Signal<number> {
    return computed(() => {
      return (value())
        ? Math.floor((value() - 10) / 2 + 0.5) - Math.floor((10 - value()) / 2 + 0.5)
        : 0;
    });
  }
}
