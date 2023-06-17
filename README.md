# my-ts-lib

Features:

- Package manager [pnpm](https://pnpm.js.org/), safe and fast
- Release with [semantic-release](https://npm.im/semantic-release)
- Bundle with [tsup](https://github.com/egoist/tsup)
- Test with [vitest](https://vitest.dev)

## Install

```bash
npm i my-ts-lib
```

# api介绍

## 数据模板

#### 数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值

```ts
// 键名   key
// 生成规则 rule
// 属性值   value
'key|rule': value
//语法
Mock.mock('abc|min-max':value)
```

- 注意
  - 生成规则 的 含义 需要依赖 属性值的类型 才能确定。
  - 属性值 还指定了最终值的初始值和类型。

### 1.**属性值是string**

- `'key|min-max': string`  
  生成value为string的 重复次数在[min, max]之间的
  
- `'key|count': string`  
  生成value为string的 重复次数为count

### 2.**属性值是数字 Number**

- `'key|+1': number`  
  属性值自动加 1，初始值为 number。

- `'key|min-max': number`  
  生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。

- `'key|min-max.dmin-dmax': number`  
  生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。

#### 3. **属性值是布尔型 Boolean**

- `'name|1': boolean`  
  随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

#### 4. **属性值是对象 Object**

- `'name|count': object`  
  从属性值 object 中随机选取 count 个属性。
- `'name|min-max': object`  
  从属性值 object 中随机选取 min 到 max 个属性。

#### 5. **属性值是数组 Array**

- `'name|1': array`  
  从属性值 array 中随机选取 1 个元素，作为最终值。
- `'name|+1': array`
  从属性值 array 中顺序选取 1 个元素，作为最终值。
- `'name|min-max': array`  
  通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。
- `'name|count': array`  
  通过重复属性值 array 生成一个新数组，重复次数为 count。

## 随机生成数据

#### 用法

```ts
Mock.Random.xxx()
```

#### 1.**人名生成**

- `Random.name(nameNum?: number, isChinese?: boolean)`
    -
  - `nameNum:` , 生成多少位名字，最大3位，最少1位
  - `isChinese`, 是否是中国姓名，false为英文姓名

- `Random.name()`  张子
- `Random.name(3)`  张子涵 or John Michael Smith  
- `Random.name(true)` 张子涵
- `Random.name(2,false)` John  Smith

#### 2.**城市名生成**

- `Random.city(isChinese?: boolean)`
  -

  - `isChinese`, 是否是中国地名，false为外国地名

- `Random.city()` 深圳
- `Random.city(false)` New York

#### 3.**ip生成**

- `Random.ipV4()`
    -

- `Random.ipV6()`
    -
  
- `Random.IPv4()` 221.121.34.56
- `Random.IPV6(false)` fd1a:6f7a:4f3a:8d2e:6d7c:9f2f:5e3b:8a1c

#### 4.**mac生成**

- `Random.mac()`
  -

- `Random.mac()` 1c:5a:3e:b2:5f:4c

#### 5.**字符**

- `Random.character(pool?: string)`
  -
  
  - `pool` 'lower/upper/number/symbol'或者 给定字符串的处理范围

- `Random.character()`  'a'
- `Random.character('lower')`  'a'
- `Random.character('upper')`  'A'
- `Random.character('number')`  '2'
- `Random.character('symbol')`  '*'
- `Random.character('asdadasst')`  't'

#### 5.**字符串**

- `Random.string(pool?: string, min?: number, max?: number)`
  -
  
  - `pool` 'lower/upper/number/symbol'或者给定字符串的处理范围
  - `min` 最小值，随机长度的最小值。当只有最小值，没有最大值时，最小值则为生成字符串的长度
  - `max` 最大值，随机长度的最大值

- `Random.string()`  'a'
- `Random.string('lower', 3)`  'abc'
- `Random.string('upper', 2,4)`  'ARDF'
- `Random.string('number',2,5)`  '245'
- `Random.string('symbol', 2)`  '*%'
- `Random.string('asdadasst',4)`  'asda'

#### 5.**数字**

- `Random.int( min?: number, max?: number)`
  -
  
  - `min` 最小值，随机大小的最小值。
  - `max` 最大值，随机大小的最大值。

- `Random.int()`  555555
- `Random.int(33)`  10000
- `Random.int(35,39)`  37

- `Random.float( min?: number, max?: number, dmin?: number, dmax?: number)`
  -
  
  - `min` 最小值，随机大小的最小值。
  - `max` 最大值，随机大小的最大值。
  - `dmin` 保留小数点后几位的最小保留位数
  - `dmax` 保留小数点后几位的最大保留位数

- `Random.float()`  555555
- `Random.float(33,2)`  34.56
- `Random.float(35,39,2,4)`  37.651

#### 6.**字节流量**

- `Random.bytes( min: number, max: number)`
  -
  
  - `min` 最小值，随机大小的最小值。
  - `max` 最大值，随机大小的最大值。

- `Random.bytes()`  15416541
- `Random.bytes(45646，56465)`  45647

- `Random.bytesToSize( min?: number, max?: number)` 并自动转为对应的单位
  -
  
  - `min` 最小值，随机大小的最小值。
  - `max` 最大值，随机大小的最大值。

- `Random.bytesToSize(1024)`  1KB
