import {Die} from '../models/die';

export class RollUtil {
  public static roll(... dice: Die[]): number {
    return dice.reduce((result: number, die: Die) => result + die.roll(), 0);
  }

  public static rollD20(){
    return RollUtil.roll(new Die(20));
  }
}
