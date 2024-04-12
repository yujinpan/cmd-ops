export enum Style {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse = 7,
  hidden,
  strikethrough,
  black = 30,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  bgBlack = 40,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  gray = 90,
}

/**
 * 'Hello, {red|World}!' => Hello, World! (World is red)
 */
export function getStyleText(msg: string, defaultStyle?: Style): string {
  if (defaultStyle) {
    return styleText(defaultStyle, msg);
  } else {
    const match = Array.from(msg.match(/\{\w+\|[^}]*}/g) || []);
    match.forEach((item) => {
      const [style, text] = item.slice(1, -1).split('|');
      msg = msg.replace(item, styleText(style, text));
    });
    return msg;
  }
}

function styleText(style: Style | string, text: string) {
  return `\x1b[${styleNumber(style)}m${text}\x1b[0m`;
}

function styleNumber(style: Style | string): number {
  return (
    (style in Object.values(Style) ? (style as number) : Style[style]) || 0
  );
}
