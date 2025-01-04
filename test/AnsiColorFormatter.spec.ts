import { describe, expect, it } from 'vitest';
import { AnsiColorFormatter } from '../src/colors';
import { RGBColor } from '../src/types';

describe('Color manipulation', () => {
  const formatter = new AnsiColorFormatter();

  it('should translate rgb to ANSI TrueColor', () => {
    const text: RGBColor = [255, 0, 0];
    const bg: RGBColor = [0, 255, 255];
    const message = 'Hello World';
    const expected = '\x1b[48;2;0;255;255m\x1b[38;2;255;0;0mHello World\x1b[0m';

    expect(formatter.colorize(message, text, bg)).toBe(expected);
  });

  it('should translate hex to ANSI TrueColor', () => {
    const text = '#FF0000';
    const bg = '#00FFFF';
    const message = 'Hello World';
    const expected = '\x1b[48;2;0;255;255m\x1b[38;2;255;0;0mHello World\x1b[0m';

    expect(formatter.colorize(message, text, bg)).toBe(expected);
  });
});
