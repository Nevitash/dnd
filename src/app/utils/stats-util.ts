import {computed, Signal} from '@angular/core';

export class StatsUtil {
  public static computeModifier(value: Signal<number>): Signal<number> {
    return computed(() => Math.floor((value() - 10) / 2 + 0.5) - Math.floor((10 - value()) / 2 + 0.5));
  }
}
