import {Die} from '../models/die';

export class RollUtil {
  public static roll(...dice: Die[]): number {
    return dice.reduce((result: number, die: Die) => result + die.roll(), 0);
  }

  public static rollD20() {
    return RollUtil.roll(new Die(20));
  }

  public static rollWithDiceCode(diceCode: string): number {
    const entries = this.splitDiceCode(diceCode);
    //No dices detected
    if (entries?.length === 0) {
      return 0;
    }
    let sum: number = 0;
    //We want either "d20" or "4d20"
    for (let entry of entries) {
      const operator = (entry.startsWith("-")) ? "-" : "+";
      entry = entry.replace(operator, "");
      let value = (RollUtil.isDiceCode(entry)) ? RollUtil.rollSingleDiceCode(entry) : parseInt(entry);
      sum = (operator === "-") ? sum - value : sum + value;
    }
    return sum;
  }

  public static splitDiceCode(diceCode: string): string[] {
    const parts: string[] = [];
    const splitPattern = /([+-]?\d*d\d+|[+-]?\d+)/gm
    diceCode = RollUtil.cleanDiceCode(diceCode);
    const matches =diceCode.match(splitPattern)
    //No dices detected
    if (!matches || matches?.length === 0) {
      return parts;
    }
    for (const match of matches) {
      parts.push(match);
    }
    return parts;
  }

  public static isDiceCode(entry: string): boolean {
    return entry.match(/^\d*d\d+/g) !== null;
  }

  public static cleanDiceCode(diceCode: string): string {
    return diceCode.trim().replace(/\s+/g, '+').replace(/[+]{2,}/, "+").replace(/[-]{2,}/, "-");
  }

  public static rollSingleDiceCode(diceCode: string): number {
    if (!this.isDiceCode(diceCode)) {
      return 0;
    }
    const dicePattern = new RegExp('^(?<amount>\\d*)d(?<sides>\\d+)$');
    const match = diceCode.match(dicePattern);
    if (!match?.groups) {
      return 0;
    }
    //We can have codes like "d20" which is translated to "1d20"
    let amount = match.groups["amount"]?.length > 0 ? match.groups["amount"] : "1";
    let sides = match.groups["sides"];
    //There is no die without sides
    if (!sides) {
      return 0;
    }
    //This creates an array with length "amount" consisting of our new dice
    const dice = Array.from(
      {length: parseInt(amount)},
      (_currentValue, _index) => new Die(parseInt(sides))
    );
    return RollUtil.rollDice(dice);
  }

  public static rollDice(dice: Die[]): number {
    return RollUtil.roll(...dice);
  }
}
