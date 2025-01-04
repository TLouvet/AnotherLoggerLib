import { describe, expect, it } from 'vitest';
import { AnsiColorFormatter } from '../src/colors';
import { RGBColor } from '../src/types';

describe('Color manipulation', () => {
  const formatter = new AnsiColorFormatter();

  it('should translate rgb to ANSI text TrueColor', () => {
    const red: RGBColor = [255, 0, 0];
    const cyan: RGBColor = [0, 255, 255];

    expect(formatter.getAnsiTextColor(red)).toBe('\x1b[38;2;255;0;0m');
    expect(formatter.getAnsiTextColor(cyan)).toBe('\x1b[38;2;0;255;255m');
  });

  it('should translate hex to ANSI text TrueColor', () => {
    const red = '#FF0000';
    const cyan = '#00FFFF';

    expect(formatter.getAnsiTextColor(red)).toBe('\x1b[38;2;255;0;0m');
    expect(formatter.getAnsiTextColor(cyan)).toBe('\x1b[38;2;0;255;255m');
  });

  it('should translate rbg to ANSI bg TrueColor', () => {
    const red: RGBColor = [255, 0, 0];
    const cyan: RGBColor = [0, 255, 255];

    expect(formatter.getAnsiBgColor(red)).toBe('\x1b[48;2;255;0;0m');
    expect(formatter.getAnsiBgColor(cyan)).toBe('\x1b[48;2;0;255;255m');
  });

  it('should translate hex to ANSI bg TrueColor', () => {
    const red = '#FF0000';
    const cyan = '#00FFFF';

    expect(formatter.getAnsiBgColor(red)).toBe('\x1b[48;2;255;0;0m');
    expect(formatter.getAnsiBgColor(cyan)).toBe('\x1b[48;2;0;255;255m');
  });
});
