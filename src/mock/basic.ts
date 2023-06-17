import { GenerateContext, GenerateOptions, HandlerDataType, resultParams } from "../types"
import { parse } from "./parser"
import * as utils from '../utils'
import random from '../random'
import constant from "../constant"
import { pick, shuffle } from "../utils"
 
const handler: HandlerDataType = {
  // template        属性值（即数据模板）
  // name            属性名
  // context         数据上下文，生成后的数据
  // templateContext 模板上下文，


  gen: function (template:any, name?: string | number, context?: Partial<GenerateContext>): any {
    name = name === undefined ? '' : name.toString()
    context = context || {}
    context = {
      // 当前访问路径，只有属性名，不包括生成规则
      path: context.path || [constant.GUID],
      templatePath: context.templatePath || [constant.GUID++], // 最终属性值的上下文
    }
    
    const rule = parse(name)
    const type = utils.type(template)
    let data
    
    if (handler[type]) {
      data = handler[type]({
        type, // 属性值类型
        template, // 属性值模板
        name, // 属性名
        rule,
        context,
      })
      
      if (!context.root) {
        context.root = data
      }
      return data
    }
    
    return template
  },
  
  array: function (options: GenerateOptions) {
    let result: any[] = []
    
    // 'name|1': []
    // 'name|count': []
    // 'name|min-max': []
    if (options.template.length === 0) return result
    
    // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
    if (!options.rule.parameters) {
      for (let i = 0; i < options.template.length; i++) {
        options.context.path.push(i)
        options.context.templatePath.push(i)
        result.push(handler.gen(options.template[i], i, {
          path: options.context.path,
          templatePath: options.context.templatePath,
        }))
        options.context.path.pop()
        options.context.templatePath.pop()
      }
    } else {
      // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
      if (options.rule.min === 1 && options.rule.max === undefined) {
        options.context.path.push(options.name)
        options.context.templatePath.push(options.name)
        result = pick(handler.gen(options.template, undefined, {
          path: options.context.path,
          templatePath: options.context.templatePath,
        }))
        options.context.path.pop()
        options.context.templatePath.pop()
      } else {
        // 'data|+1': [{}, {}]
        if (options.rule.parameters[2]) {
          options.template.__order_index = options.template.__order_index || 0
          
          options.context.path.push(options.name)
          options.context.templatePath.push(options.name)
          result = handler.gen(options.template, undefined, {
            path: options.context.path,
            templatePath: options.context.templatePath,
          })[options.template.__order_index % options.template.length]
          
          options.template.__order_index += +options.rule.parameters[2]
          
          options.context.path.pop()
          options.context.templatePath.pop()
        } else if (options.rule.count) {
          // 'data|1-10': [{}]
          for (let i = 0; i < options.rule.count; i++) {
            // 'data|1-10': [{}, {}]
            for (let ii = 0; ii < options.template.length; ii++) {
              options.context.path.push(result.length)
              options.context.templatePath.push(ii)
              result.push(handler.gen(options.template[ii], result.length, {
                path: options.context.path,
                templatePath: options.context.templatePath,
              }))
              options.context.path.pop()
              options.context.templatePath.pop()
            }
          }
        }
      }
    }
    return result
  },
  
  object: function (options: GenerateOptions) {
    const result:resultParams = {}
    // 'obj|min-max': {}
    if (options.rule.min != undefined) {
      let keys = utils.keys(options.template)
      keys = shuffle(keys)
      keys = keys.slice(0, options.rule.count)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        let parsedKey = key.replace(constant.RE_KEY, '$1')
        
        options.context.path.push(parsedKey)
        options.context.templatePath.push(key)
        result[parsedKey] = handler.gen(options.template[key], key, {
          path: options.context.path,
          templatePath: options.context.templatePath,
        })
        options.context.path.pop()
        options.context.templatePath.pop()
      }
    } else {
      // 'obj': {}
      let keys: string[] = []
      for (const key in options.template) {
        const target =  keys
        target.push(key)
      }
      
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        let parsedKey = key.replace(constant.RE_KEY, '$1')
        options.context.path.push(parsedKey)
        options.context.templatePath.push(key)
        result[parsedKey] = handler.gen(options.template[key], key, {
          path: options.context.path,
          templatePath: options.context.templatePath,
        })
        options.context.path.pop()
        options.context.templatePath.pop()
        // 'id|+1': 1
        const inc = key.match(constant.RE_KEY)
        if (inc && inc[2] && utils.type(options.template[key]) === 'number') {
          options.template[key] += parseInt(inc[2], 10)
        }
      }
    }
    return result
  },
  
  number: function (options: GenerateOptions) {
    let result
    let parts
    if (options.rule.decimal) {
      // float
      options.template += ''
      parts = options.template.split('.')
      // 'float1|.1-10': 10,
      // 'float2|1-100.1-10': 1,
      // 'float3|999.1-10': 1,
      // 'float4|.3-10': 123.123,
      parts[0] = options.rule.range ? options.rule.count : parts[0]
      parts[1] = (parts[1] || '').slice(0, options.rule.dcount)
      while (parts[1].length < options.rule.dcount!) {
        // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
        parts[1] += parts[1].length < options.rule.dcount! - 1 
          ? random.character('number')
          : random.character('123456789')
      }
      result = parseFloat(parts.join('.'))
    } else {
      // integer
      // 'grade1|1-100': 1,
      result = options.rule.range && !options.rule.parameters![2] ? options.rule.count : options.template
    }
    return result
  },
  
  boolean: function (options: GenerateOptions) {

    const result = options.rule.parameters 
      ? random.boolean(Number(options.rule.min), Number(options.rule.max), options.template) 
      : options.template
    return result
  },
  
  string: function (options: GenerateOptions) {
    let source = ''
    let result = ''
    let lastIndex = 0

    if (options.template.length) {
      // 'foo': '★',
      if (options.rule.count === undefined) {
        source += options.template
      } else {
        // 'star|1-5': '★',
        for (let i = 0; i < options.rule.count; i++) {
          source += options.template
        }
      }

      if (lastIndex < source.length) {
        result += source.slice(lastIndex)
      }
    } else {
      // 'ASCII|1-10': '',
      // 'ASCII': '',
      result = options.rule.range ? random.string(options.rule.count) : options.template
    }
    return result
  },
  
}


export default handler