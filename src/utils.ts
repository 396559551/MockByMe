import { natural } from "./random/basicDataType"

export const isDef = function (value: unknown): boolean {
  return value !== undefined && value !== null
}


export const keys = function (obj: object): string[] {
  const keys: string[] = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  return keys
}

export const type = function (value: any): string {
  return isDef(value) 
    ? Object.prototype.toString.call(value).match(/\[object (\w+)\]/)![1].toLowerCase() 
    : String(value)
}


export function pick<T = any> (arr: T[], min: number = 1, max?: number): T | T[] {
  

  // pick( [ item1, item2 ... ], count )
  if (!isDef(max)) {
    max = min
  }
  
  if (min === 1 && max === 1) {
    return pickOne<T>(arr)
  }

}

export const pickOne = function<T = any> (arr: T[]): T {
  return arr[natural(0, arr.length - 1)]
}
// 打乱数组中元素的顺序，并按照 min - max 返回。
export const shuffle = function<T = any> (arr: T[], min?: number, max?: number): T[] {
  const copy = arr.slice()
  const length = arr.length
  for (let i = 0; i < length; i++) {
    const swapIndex = natural(0, length - 1)
    const swapValue = copy[swapIndex]
    copy[swapIndex] = copy[i]
    copy[i] = swapValue
  }
  if (min && max) {
    return copy.slice(0, natural(min, max))
  }
  if (min) {
    return copy.slice(0, min)
  }
  return copy
}