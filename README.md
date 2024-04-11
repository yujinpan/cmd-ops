# cmd-ops

Operators for command.

## progress

- Progress

```ts
import { Progress } from 'cmd-ops'

const progress = new Progress({
  title: 'Task...',
  total: 100,
})

progress.update(10);

progress.end()
```

## style

- getStyleText

```ts
import { getStyleText, Style } from 'cmd-ops'

console.log(getStyleText(`Hello {${Style.red}|World}!`))
```

## utils

- print

```ts
import { print } from 'cmd-ops'

print('Hello {red|World}!')
```