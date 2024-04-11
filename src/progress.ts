import readline from 'readline';

import { getStyleText, Style } from './style';

export type ProgressOptions = {
  total?: number;
  current?: number;
  title?: string;
  bar?: boolean;
  stream?: NodeJS.WriteStream;
  render?: (current: number, total: number) => string;
};

export class Progress {
  private readonly stream: NodeJS.WriteStream;
  private readonly options: ProgressOptions;

  title = '';
  total = 0;
  current = 0;

  constructor(options: ProgressOptions = {}) {
    this.stream = options.stream || process.stdout;
    this.options = options;

    this.total = options.total === 0 ? 0 : options.total || 100;
    this.current = options.current || 0;
    this.title = options.title || '';

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
      this.stream.write(' Done!\n');
    }
  }

  render() {
    readline.cursorTo(this.stream, 0);
    readline.clearLine(this.stream, 1);
    this.stream.write(
      this.options.render?.(this.current, this.total) ||
        `${this.title} ${this.options.bar ? this.renderBar() + ' ' : ''}${
          this.current
        }/${this.total}`,
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
