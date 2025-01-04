import { describe, it, expect } from 'vitest';
import { deepMerge } from '../src/utils';

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
