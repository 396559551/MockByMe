import * as basic from './basicDataType/index';

 export const ipV4 = function (): string {
  return basic.natural(0, 255) + '.' +
  basic.natural(0, 255) + '.' +
  basic.natural(0, 255) + '.' +
  basic.natural(0, 255)
}

export const ipV6 = function (): string {
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += basic.natural(0, 65535).toString(16) + ':';
  }
  return result.slice(0, -1);
}
