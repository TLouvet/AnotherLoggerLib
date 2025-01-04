import { RGBColor } from './types';

export class AnsiColorFormatter {
  private readonly ANSI_TRUE_COLOR_PREFIX = '38';
  private readonly ANSI_TRUE_BG_PREFIX = '48';

  colorize(message: string, color: string | RGBColor, bg: string | RGBColor = ''): string {
    const formattedColor = this.formatColor(color, 'color');
    const formattedBG = this.formatColor(bg, 'bg');

    return `${formattedBG}${formattedColor}${message}\x1b[0m`;
  }

  private formatColor(color: string | RGBColor, type: 'bg' | 'color' = 'color') {
    if (Array.isArray(color)) {
      const [r, g, b] = color;
      return this.rgbToAnsiTrueColor(r, g, b, type);
    }

    if (this.isHexColor(color)) {
      return this.hexToAnsi(color, type);
    }

    return color;
  }

  private rgbToAnsiTrueColor(r: number, g: number, b: number, type: 'color' | 'bg'): string {
    const prefix = type === 'color' ? this.ANSI_TRUE_COLOR_PREFIX : this.ANSI_TRUE_BG_PREFIX;
    return `\x1b[${prefix};2;${r};${g};${b}m`;
  }

  private isHexColor(color: string) {
    return color.startsWith('#');
  }

  private hexToAnsi(hex: string, type: 'color' | 'bg') {
    return this.rgbToAnsiTrueColor(...this.hexToRgb(hex), type);
  }

  private hexToRgb(hex: string): [number, number, number] {
    const intbase10 = parseInt(hex.replace('#', ''), 16);
    return [(intbase10 >> 16) & 255, (intbase10 >> 8) & 255, intbase10 & 255];
  }
}
