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
export function getStyleText(msg: string) {
  const match = Array.from(msg.match(/\{\w+\|[^}]*}/g) || []);
  if (match.length) {
    match.forEach((item) => {
      const [style, text] = item.slice(1, -1).split('|');
      const styleFormat = style in Object.values(Style) ? style : Style[style];
      msg = msg.replace(item, `\x1b[${styleFormat || 0}m${text}\x1b[0m`);
    });
  }
  return msg;
}
