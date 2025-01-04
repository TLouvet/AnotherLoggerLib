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
