import type { ProgressOptions } from './progress';

import { Progress } from './progress';

describe('progress', () => {
  const runProgress = async (options?: ProgressOptions) => {
    const progress = new Progress(options);
    while (progress.current < 100) {
      await sleep(200);
      progress.update(progress.current + 20);
    }
    progress.end();
  };

  it('should show progress infos', async function () {
    await runProgress();
    await runProgress({ total: 0 });
  });
  it('should show progress infos with bar', async function () {
    await runProgress({ bar: true });
  });
  it('should show progress infos with title', async function () {
    await runProgress({ title: 'Test...' });
  });
  it('should show progress infos with title width', async function () {
    await runProgress({ title: 'Test...', titleWidth: 10 });
  });
  it('should show progress infos with count width', async function () {
    await runProgress({ title: 'Test...', countWidth: 10 });
  });
});

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
