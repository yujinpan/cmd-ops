import { getStyleText } from './style';

describe('style', function () {
  it('should getStyleText', function () {
    expect(getStyleText('Hello, World!')).toBe('Hello, World!');
    expect(getStyleText('Hello, {red|World}!')).toBe(
      'Hello, \x1b[31mWorld\x1b[0m!',
    );
    expect(getStyleText('Hello, {123|World}!')).toBe(
      'Hello, \x1b[0mWorld\x1b[0m!',
    );
    expect(
      getStyleText(`Hello,
{red|World}!`),
    ).toBe(`Hello,
\x1b[31mWorld\x1b[0m!`);
  });
});
