import { parse } from "./mock/parser";

export interface CharacterPool {
  lower: string;
  upper: string;
  number: string;
  symbol: string;
  alpha: string;
  [key: string]: string;
}


export interface GenerateContext {
  path: Array<string | number>;
  templatePath: Array<string | number>;
  currentContext: Object;
  templateCurrentContext: Object;
  root: any;
  templateRoot: any;
}

export interface GenerateOptions {
  type: string;
  template: any;
  name: string;
  rule: ReturnType<typeof parse>;
  context: GenerateContext;
  parsedName: string;
}

export interface HandlerDataType {
  [key: string]: any;
}

export interface DateFormat {
  yy: (date: Date) => string;
  MM: (date: Date) => string;
 
  dd: (date: Date) => string;
  HH: (date: Date) => string;
  hh: (date: Date) => string;
 
  mm: (date: Date) => string;
  ss: (date: Date) => string;

}

export enum FormatType {
  yyyy_MM_dd = 'yyyy-MM-dd',
  HH_mm_ss= 'HH:mm:ss',
  yyyy_MM_dd_HH_mm_ss = 'yyyy-MM-dd HH:mm:ss'
}

export interface resultParams {
  [key: string]: any;
}

export enum DateUnit {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
  WEEK = 'week'
}