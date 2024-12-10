export class Die {
  private _sides: number = 6;

  constructor(sides: number) {
    this._sides = sides;
  }

  get sides(): number {
    return this._sides;
  }

  public roll(): number {
    return Math.floor(Math.random() * (this.sides) + 1)
  }
}
