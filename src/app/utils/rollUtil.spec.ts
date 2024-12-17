import {RollUtil} from './rollUtil';
import {Die} from '../models/die';


describe('RollUtil', () => {
  let originalRoll: () => number;
  beforeAll(() => { // Save the original method
    originalRoll = Die.prototype.roll;
  });
  afterAll(() => {
    // Restore the original method
    Die.prototype.roll = originalRoll;
  });
  beforeEach(() => {
    // Mock the roll method
    spyOn(Die.prototype, 'roll').and.callFake(function (this: Die) {
      return this.sides;
    });
  });


  it('should split 3 into 3', () => {
    const diceCode = "3";
    const parts = RollUtil.splitDiceCode(diceCode);
    expect(parts).toEqual(["3"]);
  });
  it('should split d20 into d20', () => {
    const diceCode = "d20";
    const parts = RollUtil.splitDiceCode(diceCode);
    expect(parts).toEqual(["d20"]);
  });
  it('should split 2d10 into 2d10', () => {
    const diceCode = "2d10";
    const parts = RollUtil.splitDiceCode(diceCode);
    expect(parts).toEqual(["2d10"]);
  });
  it('should split 1d20+5 into 1d20, +5', () => {
    const diceCode = "1d20+5";
    const parts = RollUtil.splitDiceCode(diceCode);
    expect(parts).toEqual(["1d20", "+5"]);
  });
  it('should split 3+2d20-5-2d6+10 into 3, +2d20, -5, -2d6, +10', () => {
    const diceCode = "3+2d20-5-2d6+10";
    const parts = RollUtil.splitDiceCode(diceCode);
    expect(parts).toEqual(["3", "+2d20", "-5", "-2d6", "+10"]);
  });
  it('should clean the diceCode 3   2d6-5+++ 2d10 to 3+2d6-5+2d10', () => {
    const diceCode = "3   2d6-5+++ 2d10";
    const cleaned = RollUtil.cleanDiceCode(diceCode);
    expect(cleaned).toEqual("3+2d6-5+2d10");
  });
  it('should detect d20 as a dice code', () => {
    expect(RollUtil.isDiceCode("d20")).toBeTrue();
  });
  it('should detect 2d20 as a dice code', () => {
    expect(RollUtil.isDiceCode("2d20")).toBeTrue();
  });
  it('should detect 5 to be no dice code', () => {
    expect(RollUtil.isDiceCode("5")).toBeFalse();
  });
  it('should detect 5d to be no dice code', () => {
    expect(RollUtil.isDiceCode("5d")).toBeFalse();
  });
  it('should detect zd20 to be no dice code', () => {
    expect(RollUtil.isDiceCode("zd20")).toBeFalse();
  });
  it('should roll 1d6 and the result should be 6. Mock works', () => {
    expect(RollUtil.rollSingleDiceCode("1d6")).toEqual(6);
  });
  it('should roll d20 and the result should be 20. Mock works', () => {
    expect(RollUtil.rollSingleDiceCode("d20")).toEqual(20);
  });
  it('shouldn\'t roll for zd20 and return 0', () => {
    expect(RollUtil.rollSingleDiceCode("zd20")).toEqual(0);
  });
  it('shouldn\'t roll for 5 and return 0', () => {
    expect(RollUtil.rollSingleDiceCode("5")).toEqual(0);
  });
  it('shouldn\'t roll for 5d and return 0', () => {
    expect(RollUtil.rollSingleDiceCode("5d")).toEqual(0);
  });
  it('should roll 1+2d3-4+5d6-1d20 and the result should be 13.', () => {
    expect(RollUtil.rollWithDiceCode("1+2d3-4+5d6-1d20")).toEqual(13);
  });
});
