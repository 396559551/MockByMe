import * as basic from './basicDataType/index';


export const mac = function(): string {
  const hexDigits = '0123456789abcdef';
  let macAddress = '';
  for (let i = 0; i < 6; i++) {
    let hex = '';
    for (let j = 0; j < 2; j++) {
      hex += basic.character(hexDigits)
    }
    macAddress += hex;
    if (i < 5) {
      macAddress += ':';
    }
  }
  return macAddress;
}