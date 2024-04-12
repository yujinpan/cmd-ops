import readline from 'readline';

import { getStyleText, Style } from './style';

export type ProgressOptions = {
  total?: number;
  current?: number;
  title?: string;
  bar?: boolean;
  time?: boolean;
  stream?: NodeJS.WriteStream;
  render?: (current: number, total: number) => string;
};

export class Progress {
  private readonly options: ProgressOptions;

  get stream() {
    return this.options.stream;
  }

  title = '';
  total = 0;
  current = 0;

  private readonly startTime: number;

  constructor(options: ProgressOptions = {}) {
    options = this.options = {
      stream: process.stdout,
      time: true,
      ...options,
    };

    this.total = options.total === 0 ? 0 : options.total || 100;
    this.current = options.current || 0;
    this.title = options.title || '';

    if (options.time) {
      this.startTime = Date.now();
    }

    this.render();
  }

  update(current, total = this.total) {
    this.current = current;
    this.total = total;
    this.render();
    if (this.total !== 0 && this.current === this.total) this.end();
  }

  end() {
    if (this.current !== this.total) {
      this.update(this.total);
    } else {
      let msg = `done`;
      if (this.options.time) {
        const time = Date.now() - this.startTime;
        msg += ` in ${timeFormatter(time)}`;
      }
      this.stream.write(getStyleText(` ${msg}\n`, Style.green));
    }
  }

  render() {
    readline.cursorTo(this.stream, 0);
    readline.clearLine(this.stream, 1);
    this.stream.write(
      this.options.render?.(this.current, this.total) ||
        `${getStyleText(this.title, Style.cyan)} ${
          this.options.bar ? this.renderBar() + ' ' : ''
        }${this.current}/${this.total}`,
    );
  }

  private renderBar() {
    const total = 20;
    const percent = this.current / this.total || 0;
    const processed = Math.round(percent * total);
    const processedText = getStyleText(
      `{${Style.bgGreen}|${Array(processed).fill(' ').join('')}}`,
    );
    const unprocessedText = Array(total - processed)
      .fill(' ')
      .join('');
    return `[${processedText}${unprocessedText}]`;
  }
}

function timeFormatter(time: number) {
  return time > 1000 ? (time / 1000).toFixed(2) + 's' : time + 'ms';
}
