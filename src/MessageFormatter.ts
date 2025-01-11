export class MessageFormatter {
  private readonly MAX_POSSIBLE_DEPTH = 20;
  constructor(private maxDepth: number = 3) {}

  setMaxDepth(newMaxDepth: number) {
    if (newMaxDepth < 0) {
      this.maxDepth = 0;
    }

    if (newMaxDepth > this.MAX_POSSIBLE_DEPTH) {
      this.maxDepth = this.MAX_POSSIBLE_DEPTH;
    }
  }

  format(...args: any[]): string {
    return args.map((arg) => this.formatSingleArg(arg)).join('\n');
  }

  private formatSingleArg(arg: any, depth: number = 0): string {
    if (Array.isArray(arg)) {
      return this.formatArray(arg, depth);
    }

    if (typeof arg === 'string') {
      return this.formatString(arg, { alone: depth > 0 });
    }

    if (arg === undefined) {
      return this.formatUndefined();
    }

    if (arg === null) {
      return this.formatNull();
    }

    if (typeof arg === 'object') {
      return this.formatRecord(arg, depth);
    }

    return arg;
  }

  private formatArray(args: any[], depth: number): string {
    if (depth > this.maxDepth) {
      return '[Array]';
    }

    return '[ ' + args.map((a) => this.formatSingleArg(a, depth + 1)).join(', ') + ' ]';
  }

  private formatRecord(arg: Record<any, any>, depth: number) {
    if (depth > this.maxDepth) {
      return '[Object]';
    }

    const entries = Object.entries(arg);
    const sep = ',\n';
    const starter = '{\n';
    const end = `\n${' '.repeat(depth)}}`;
    return (
      starter +
      entries.map(([k, v]) => `${' '.repeat(depth + 1)}${k}: ` + this.formatSingleArg(v, depth + 1)).join(sep) +
      end
    );
  }

  private formatString(arg: string, options?: { alone: boolean }) {
    return options?.alone ? `'${arg}'` : arg;
  }

  private formatUndefined() {
    return 'undefined';
  }

  private formatNull() {
    return 'null';
  }
}
