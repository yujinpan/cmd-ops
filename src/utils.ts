import { getStyleText } from './style';

export function print(msg: string) {
  // eslint-disable-next-line no-console
  console.log(getStyleText(msg));
}
