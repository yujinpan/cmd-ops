import { Reporter } from './reporter';

xdescribe('reporter', () => {
  it('should reporter write', async function () {
    const reporter = new Reporter();
    reporter.write('1');
    reporter.write('2');
  });

  it('should reporter stop', async function () {
    const reporter = new Reporter();
    reporter.write('1');
    reporter.stop();
    // eslint-disable-next-line no-console
    console.log('reporter stop');
  });
});
