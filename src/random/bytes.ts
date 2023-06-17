import * as basic from './basicDataType/index';

/**
 * 
 * @param min 字节最小值
 * @param max 字节最大值
 * @returns 随机字节
 */
export const bytes = function (min: number, max: number): string {
  if(min === 0 && max === 0) return '0 Bytes';
  return basic.natural(min, max) + ' Bytes';
}
/**
 * 
 * @param min 字节最小值
 * @param max 字节最大值
 * @returns 随机字节转换成相应的单位
 */
export const bytesToSize = function (min: number, max: number): string {
  return _bytesToSize(basic.natural(min, max));
}

function _bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const result = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
  return result === 0 ? '0 Byte' : result + ' ' + sizes[i];
}