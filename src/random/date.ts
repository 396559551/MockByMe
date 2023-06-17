// Date
import { DateFormat, FormatType } from 'src/types'
import { keys } from '../utils'

const _padZero = function (value: number): string {
  return value < 10 ? '0' + value : value.toString()
}

const patternLetters: DateFormat = { 
  yy: function (date: Date): string {
    return date.getFullYear().toString().slice(2)
  },
  
  MM: function (date: Date): string {
    return _padZero(date.getMonth() + 1)
  },
  
 
  
  dd: function (date: Date): string {
    return _padZero(date.getDate())
  },
  
  HH: function (date: Date): string {
    return _padZero(date.getHours())
  },
  
  hh: function (date: Date): string {
    return _padZero(date.getHours() % 12)
  },
  
  mm: function (date: Date): string {
    return _padZero(date.getMinutes())
  },
  
  
  ss: function (date: Date): string {
    return _padZero(date.getSeconds())
  },
  
}

const _createFormatRE = function (): string {
  const re: string[] = keys(patternLetters)
  return '(' + re.join('|') + ')'
}

const _formatDate = function (date: Date, format: FormatType): string {
  const formatRE = new RegExp(_createFormatRE(), 'g')
  return format.replace(formatRE, function createNewSubString ($0, flag: keyof DateFormat): string {
    return patternLetters[flag](date) 
  })
}

// 生成一个随机的 Date 对象。
const _randomDate = function (min: Date = new Date(0), max: Date = new Date()): Date {
  const randomTS = Math.random() * (max.getTime() - min.getTime())
  return new Date(randomTS)
}

// 返回一个随机的日期字符串。
export const date = function (format: FormatType = FormatType.yyyy_MM_dd): string {
  if(format !== 'yyyy-MM-dd' && format !== 'HH:mm:ss' && format !== 'yyyy-MM-dd HH:mm:ss') {
    throw new Error("错误的格式")
  }
  return _formatDate(_randomDate(), format)
}

// 返回一个随机的时间字符串。
export const time = function (format: FormatType = FormatType.HH_mm_ss): string {
  if(format !== 'yyyy-MM-dd' && format !== 'HH:mm:ss' && format !== 'yyyy-MM-dd HH:mm:ss') {
    throw new Error("错误的格式")
  }
  return _formatDate(_randomDate(), format)
}

// 返回一个随机的日期和时间字符串。
export const datetime = function (format: FormatType = FormatType.yyyy_MM_dd_HH_mm_ss) {
  if(format !== 'yyyy-MM-dd' && format !== 'HH:mm:ss' && format !== 'yyyy-MM-dd HH:mm:ss') {
    throw new Error("错误的格式")
  }
  return _formatDate(_randomDate(), format)
}


