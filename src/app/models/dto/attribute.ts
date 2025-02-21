export class Attribute {
  private _name!: string;
  private _value!: number;
  private _modifier?: number | undefined;
  constructor(name: string, value: number, modifier?: number) {
    this.name = name;
    this.value = value;
    this.modifier = modifier;
    this.id = self.crypto.randomUUID();
  }

  private _id!: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get modifier(): number | undefined {
    return this._modifier;
  }

  set modifier(value: number | undefined) {
    this._modifier = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
