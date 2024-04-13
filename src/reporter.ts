export class Reporter {
  private readonly writeNative: NodeJS.WriteStream['write'];

  constructor(private readonly stream: NodeJS.WriteStream = process.stdout) {
    const writeNative = (stream['writeNative'] =
      stream['writeNative'] || stream.write);
    this.writeNative = writeNative.bind(stream);

    stream.write = (data, cb) => {
      if (this.isStop) return this.writeNative(data, cb);

      this.clear();
      const result = this.writeNative(data, cb);
      this.writeNative(this.content);
      return result;
    };
  }

  private content = '';
  write(content: string = this.content) {
    this.isStop = false;
    if (this.content) {
      this.content = content + '\n';
      this.stream.write('');
    } else {
      this.content = content + '\n';
      this.writeNative(this.content);
    }
  }

  clear() {
    this.writeNative(
      '\r\x1B[K\r\x1B[1A'.repeat(this.content.split('\n').length - 1),
    );
  }

  private isStop = false;
  stop() {
    this.isStop = true;
  }
}
