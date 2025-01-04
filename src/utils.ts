export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function deepMerge<T extends Object>(target: T, source: DeepPartial<T>): T {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge((target as any)[key], source[key] as any));
    }
  }
  return { ...target, ...source };
}

export function isHexColor(color: string) {
  return color.startsWith('#');
}

export function hexToAnsi(hex: string) {
  return rgbToAnsiTrueColor(...hexToRgb(hex));
}

export function rgbToAnsiTrueColor(r: number, g: number, b: number): string {
  return `\x1b[38;2;${r};${g};${b}m`;
}

function hexToRgb(hex: string): [number, number, number] {
  const intbase10 = parseInt(hex.replace('#', ''), 16);
  return [(intbase10 >> 16) & 255, (intbase10 >> 8) & 255, intbase10 & 255];
}
