import * as process from 'node:process';

import { Reporter } from './reporter';
import { getStyleText, Style } from './style';

export type ProgressOptions = {
  total?: number;
  current?: number;
  title?: string;
  titleWidth?: number;
  countWidth?: number;
  bar?: boolean;
  time?: boolean;
  stream?: NodeJS.WriteStream;
  render?: (current: number, total: number) => string;
};

export class Progress {
  private readonly options: ProgressOptions;

  reporter: Reporter;

  title = '';
  total = 0;
  current = 0;

  private readonly startTime: number;
  private visibleText = '';

  constructor(options: ProgressOptions = {}) {
    options = this.options = {
      time: true,
      ...options,
    };

    this.reporter = new Reporter(options.stream || process.stdout);

    this.total = options.total === 0 ? 0 : options.total || 100;
    this.current = options.current || 0;
    this.title = options.title || '';

    if (options.titleWidth) {
      this.title = fillText(this.title, options.titleWidth);
    }

    if (options.time) {
      this.startTime = Date.now();
    }

    this.render();
  }

  update(current: number, total = this.total) {
    this.current = current;
    this.total = total;
    this.render();
  }

  end() {
    const success = this.current >= this.total;

    let msg = success ? ' done' : ' fail';
    if (this.options.time) {
      const time = Date.now() - this.startTime;
      msg += ` in ${timeFormatter(time)}`;
    }

    this.visibleText += getStyleText(
      ` ${msg}`,
      success ? Style.green : Style.red,
    );

    this.reporter.write(this.visibleText);
    this.reporter.stop();
  }

  render() {
    const bar = this.options.bar ? this.renderBar() + ' ' : '';

    let count = `${this.current}/${this.total}`;
    if (this.options.countWidth) {
      count = fillText(count, this.options.countWidth);
    }

    this.visibleText =
      this.options.render?.(this.current, this.total) ||
      `${getStyleText(this.title, Style.cyan)} ${bar}${count}`;

    this.reporter.write(this.visibleText);
  }

  clear() {
    this.reporter.clear();
  }

  private renderBar() {
    const total = 20;
    const percent = Math.min(this.current / this.total || 0, 1);
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

function fillText(text: string, length: number) {
  while (text.length < length) {
    text += ' ';
  }
  return text;
}
