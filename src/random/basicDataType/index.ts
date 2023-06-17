import { CharacterPool } from "src/types"
import { isDef } from "src/utils"


const MAX_NATURE_NUMBER = Infinity
const MIN_NATURE_NUMBER = -Infinity

// 返回一个随机的布尔值。
export const boolean = function (min: number = 1, max: number = 1, current?: boolean): boolean {
  if (isDef(current)) {
    if (isDef(min)) {
      min = !isNaN(min) ? parseInt(min.toString(), 10) : 1
    }
    if (isDef(max)) {
      max = !isNaN(max) ? parseInt(max.toString(), 10) : 1
    }
    return Math.random() > 1.0 / (min + max) * min ? !current : current!
  }

  return Math.random() >= 0.5
}

// 返回一个随机的自然数（大于等于 0 的整数）。
export const natural = function (min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
  if (isNaN(min) || isNaN(max)) {
    throw new Error("输入必须是数字");
  } else if (min < 0) {
    throw new Error("最小值不能小于0");
  } else if (min > max) {
    [min, max] = [max, min];
  }
  const parsedMin = parseInt(min.toString(), 10);
  const parsedMax = parseInt(max.toString(), 10);

  return Math.round(Math.random() * (parsedMax - parsedMin)) + parsedMin;
}

// 返回一个随机的整数。
export const integer = function (min: number = MIN_NATURE_NUMBER, max: number = MAX_NATURE_NUMBER): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  min = parseInt(min.toString(), 10)
  max = parseInt(max.toString(), 10)
  return Math.round(Math.random() * (max - min)) + min
}

export const int = integer

// 返回一个随机的浮点数。
export const float = function (min: number, max: number, dmin: number, dmax: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  dmin = isDef(dmin) ? dmin : 0
  dmin = Math.max(Math.min(dmin, 17), 0)
  dmax = isDef(dmax) ? dmax : 17
  dmax = Math.max(Math.min(dmax, 17), 0)
  let ret = integer(min, max) + '.'
  for (let i = 0, dcount = natural(dmin, dmax); i < dcount; i++) {
    // 最后一位不能为 0
    const num = i < dcount - 1 ? character('number') : character('123456789')
    ret += num
  }
  return parseFloat(ret)
}

// 返回一个随机字符。
export const character = function (pool: string = ''): string {

  const pools: CharacterPool = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    symbol: '!@#$%^&*()[]',
    alpha: '',
  };
  pools.alpha = pools.lower + pools.upper
  if (!pool) {
    pool = pools.lower + pools.upper + pools.number + pools.symbol;
  } else {
    pool = pools[pool.toLowerCase()] || pool
  }
  
  return pool.charAt(natural(0, pool.length - 1))
}

export const char = character

// 返回一个随机字符串。
export const string = function (pool?: any, min?: number, max?: number): string {
  let len
  switch (arguments.length) {
    case 0: // ()
      return character()
    case 1: // ( length )
      len = pool
      pool = undefined
      break
    case 2:
      // ( pool, length )
      if (typeof arguments[0] === 'string') {
        len = min
      } else {
        // ( min, max )
        len = natural(pool, min)
        pool = undefined
      }
      break
    case 3:
      len = natural(min, max)
      break
  }

  let result = ''
  for (let i = 0; i < len; i++) {
    result += character(pool)
  }
  
  return result
}


// 返回一个整型数组。
export function range(start: number, stop: number, step: number = 1): number[] {
  
  if (step === 0) {
    throw new Error("步长不能为0")
  }
  if (stop < start) {
    [start, stop] = [stop, start]
  }
  const len = Math.ceil((stop - start) / step)
  const range = new Array<number>(len)
  for (let i = 0, value = start; i < len; i++, value += step) {
    range[i] = value
  }
  return range
}

