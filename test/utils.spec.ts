import { describe, it, expect } from 'vitest';
import { deepMerge, hexToAnsi, rgbToAnsiTrueColor } from '../src/utils';

describe('Deep merge', () => {
  it('should merge a property', () => {
    const obj = { a: 'abc' };

    const res = deepMerge(obj, { a: 'someNewValue' });

    expect(res).toEqual({ a: 'someNewValue' });
  });

  it('should deep merge an object into a new version', () => {
    const obj = {
      a: {
        b: {
          c: 1,
          d: 2,
        },
      },
    };

    const res = deepMerge(obj, { a: { b: { c: 10 } } });

    expect(obj).toEqual({
      a: { b: { c: 1, d: 2 } },
    });

    expect(res).toEqual({ a: { b: { c: 10, d: 2 } } });
  });
});

describe('Color manipulation', () => {
  it('should translate red rgb to ansi', () => {
    const red = [255, 0, 0] as const;
    expect(rgbToAnsiTrueColor(...red)).toBe('\x1b[38;2;255;0;0m');
  });

  it('should translate cyan rgb to ansi', () => {
    const cyan = [0, 255, 255] as const;
    expect(rgbToAnsiTrueColor(...cyan)).toBe('\x1b[38;2;0;255;255m');
  });

  it('should translate red hex to ANSI', () => {
    const red = '#FF0000';
    expect(hexToAnsi(red)).toBe('\x1b[38;2;255;0;0m');
  });

  it('should translate cyan hex to ansi', () => {
    const cyan = '#00FFFF';
    expect(hexToAnsi(cyan)).toBe('\x1b[38;2;0;255;255m');
  });

  it('should translate invalid hex color to black', () => {
    const invalidHex = '#';
    const anotherInvalidHex = '#GSSXVX';
    expect(hexToAnsi(invalidHex)).toBe('\x1b[38;2;0;0;0m');
    expect(hexToAnsi(anotherInvalidHex)).toBe('\x1b[38;2;0;0;0m');
  });
});
