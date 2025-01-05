### TrueColor System

For more precise control, the TrueColor system allows you to define colors with full 24-bit RGB values. Use the
format `\x1b[38;2;R;G;Bm` for text color and `\x1b[48;2;R;G;Bm` for background color.

```typescript
Logger.config({
  levels: {
    info: { color: '\x1b[38;2;0;128;255m', bg: '\x1b[48;2;0;0;0m'  }, // Soft blue, black bg
    success: { color: '\x1b[38;2;0;255;128m' }, // Lime green
  },
});`;
```

Please note that the browser console will accept true color format, and also the majority of terminals. However the older
ones may not display the color correctly (hello old Powershell)

### Hex and RGB Support

For convenience, you can use colors in either **Hex** format or **RGB** arrays. The Logger
will automatically convert these into TrueColor codes.

#### Examples

```typescript
// Using Hex
Logger.config({
  levels: {
    warning: { color: '#FFA500' }, // Orange
  },
});

// Using RGB
Logger.config({
  levels: {
    critical: { color: [255, 0, 255] }, // Magenta
  },
});
```
