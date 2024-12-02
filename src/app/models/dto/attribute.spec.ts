import { Attribute } from './attribute';

describe('Attribute', () => {
  it('should create an instance', () => {
    expect(new Attribute("TestAttr", 10)).toBeTruthy();
  });
});
