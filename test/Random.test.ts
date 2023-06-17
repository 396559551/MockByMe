import { it, expect, describe } from 'vitest';
import Mock from '../src/index' 
import { CharacterPool } from '../src/types';
const pools: CharacterPool = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!@#$%^&*()[]',
  alpha: '',
};

describe('Mock.Random',() => {
  it('随机的整数1', () => {
    expect(Mock.Random.int()).toBeTypeOf('number');
    expect(() => Mock.Random.natural(-2,4)).toThrowError(new Error("最小值不能小于0"));
  });
  it('随机的整数2', () => {
    let restult1 = Mock.Random.int(-2,4)
    expect(restult1).toBeGreaterThanOrEqual(-2);
    expect(restult1).toBeLessThanOrEqual(4);
    let restult2 = Mock.Random.int(6,4) 
    expect(restult2).toBeGreaterThanOrEqual(4);
    expect(restult2).toBeLessThanOrEqual(6);
  });
  it('随机的整数2,异常', () => {
    let restult2 = Mock.Random.natural(6,4)
    expect(restult2).toBeGreaterThanOrEqual(4);
    expect(restult2).toBeLessThanOrEqual(6);
  });
  it('随机的布尔值', () => {
    expect(Mock.Random.boolean()).toBeTypeOf('boolean');
    expect(Mock.Random.boolean(2,4, false)).toBeTypeOf('boolean');
    expect(Mock.Random.boolean(2,4)).toBeTypeOf('boolean');
    expect(Mock.Random.boolean(2)).toBeTypeOf('boolean');
  });
  it('随机的浮点数1', () => {
    let result = Mock.Random.float(2,56,2,5)
    expect(result).to.be.a('number');
    expect(result % 1).to.not.equal(0)
    expect(result.toString().split('.')[1].length).to.be.within(2, 5);
  })
  it('随机的浮点数2,异常', () => {
    let result = Mock.Random.float(64,4,2,5)
    expect(result).to.be.a('number');
    expect(result % 1).to.not.equal(0)
    expect(result.toString().split('.')[1].length).to.be.within(2, 5);
  })
  it('随机的字符1', () => {
    let result = Mock.Random.character('5weweeqsad4')
    expect(result).toBeTypeOf('string');
    expect(result.length).toEqual(1)
  })
  it('随机的字符2', () => {
    let result = Mock.Random.character('lower')
    expect(result).toBeTypeOf('string');
    expect(result.length).toEqual(1);
    expect(pools.lower).to.include(result)
  })
  it('随机的字符3', () => {
    let result = Mock.Random.char()
    expect(result).toBeTypeOf('string');
    expect(result.length).toEqual(1);
    expect(pools.lower + pools.upper + pools.number + pools.symbol).to.include(result)
  })
  it('随机的字符串1', () => {
    let result = Mock.Random.string()
    expect(result).toBeTypeOf('string');
  })
  // it('随机的字符串2', () => {
  //   let result = Mock.Random.string('2112312')
  //   expect(result).toBeTypeOf('string');
  //   expect('2112312').to.include(result);
  // })
  it('随机的字符串2', () => {
    let result = Mock.Random.string('2112312',2)
    expect(result).toBeTypeOf('string');
    expect(hasChars('2112312',result)).toBe(true)
  })

  it('随机的字符串3', () => {
    let result = Mock.Random.string(2,5)
    expect(result).toBeTypeOf('string');
    let result1 = result.split('')
    expect(result1.length).toBeGreaterThanOrEqual(2);
      expect(result1.length).toBeLessThanOrEqual(5);
  })

  it('随机的字符串4', () => {
    let result = Mock.Random.string('2123121',2,5)
    expect(result).toBeTypeOf('string');
    let result1 = result.split('')
    expect(result1.length).toBeGreaterThanOrEqual(2);
    expect(result1.length).toBeLessThanOrEqual(5);
    expect(hasChars('2123121',result)).toBe(true)
  })


  it('随机的数组1', () => {
    let result = Mock.Random.range(2,20,5)
    expect(result).toBeTypeOf('object');
    expect( JSON.stringify(result) === JSON.stringify([2,7,12,17])).toBe(true)
  })
  it('随机的数组2', () => {
    expect(() => Mock.Random.range(2,20,0)).toThrowError(new Error("步长不能为0"))
  })
  it('随机的数组3', () => {
    let result = Mock.Random.range(20,2,5)
    expect( JSON.stringify(result) === JSON.stringify([2,7,12,17])).toBe(true)
  })
})
function hasChars(str, chars) {
  for (let i = 0; i < chars.length; i++) {
    if (!str.includes(chars[i])) {
      return false;
    }
  }
  return true;
}

 // 测试 date 函数
describe('date', () => {
  it('返回正确格式的日期字符串', () => {
    expect(Mock.Random.date('yyyy-MM-dd')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
   it('传入无效的格式字符串', () => {
    expect(() => Mock.Random.date('invalid')).toThrowError();
  });
});
 // 测试 Mock.Random.time 函数
describe('Mock.Random.time', () => {
  it('返回正确格式的时间字符串', () => {
    expect(Mock.Random.time('HH:mm:ss')).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });
   it('传入无效的格式字符串', () => {
    expect(() => Mock.Random.time('invalid')).toThrowError(new Error("错误的格式"));
  });
});
 // 测试 Mock.Random.datetime 函数
describe('Mock.Random.datetime', () => {
  it('返回正确格式的日期时间字符串', () => {
    expect(Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });
   it('传入无效的格式字符串', () => {
    expect(() => Mock.Random.datetime('invalid')).toThrowError(new Error("错误的格式"));
  });
});


describe('Mock.Random.bytes', () => {
  it('should return a random byte between min and max', () => {
    let result = Mock.Random.bytes(1, 100);
    result = result.split('')[0];
    expect(Number(result)).toBeGreaterThanOrEqual(1);
    expect(Number(result)).toBeLessThanOrEqual(100);
  });
   it('should return 0 when min and max are both 0', () => {
    const result = Mock.Random.bytes(0, 0);
    expect(result).toBe('0 Bytes');
  });
});
 describe('Mock.Random.bytesToSize', () => {
  it('should convert bytes to the correct size', () => {

    expect(Mock.Random.bytesToSize(1024, 1048576)).to.include('KB');
    expect(Mock.Random.bytesToSize(1048576, 1073741824)).to.include('MB');
    expect(Mock.Random.bytesToSize(1073741824, 1099511627776)).to.include('GB');
    expect(Mock.Random.bytesToSize(1099511627776, 1125899906842624)).to.include('TB');
  });
   it('should return 0 Byte when bytes is 0', () => {
    expect(Mock.Random.bytesToSize(0, 0)).toBe('0 Byte');
  });
});

describe('ipAddress', () => { 
  describe('ipV4', () => { 
    it('should return a valid IPv4 address', () => { 
      const ipAddress = Mock.Random.ipV4(); 
      expect(ipAddress).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/); 
    }); 
     it('should return different IPv4 addresses on subsequent calls', () => { 
      const ipAddress1 = Mock.Random.ipV4(); 
      const ipAddress2 = Mock.Random.ipV4(); 
      expect(ipAddress1).not.toBe(ipAddress2); 
    }); 
  }); 
   describe('ipV6', () => { 
    it('IPv6 address', () => { 
      const ipAddress = Mock.Random.ipV6(); 
      expect(ipAddress).toMatch(/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i); 
    }); 
  }); 
});

describe('mac', () => { 
  describe('mac', () => { 
    it('should return a MAC address', () => { 
      const macAddress = Mock.Random.mac(); 
      const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
      expect(regex.test(macAddress)).toBe(true); 
    }) 
  })
});
const ChineseCities = [
  '昆明', '福州',
  '无锡', '厦门', '哈尔滨', '长春',
  '南昌', '济南', '宁波', '大连', '贵阳', '温州',
  '石家庄', '泉州', '南宁', '金华', '常州', '珠海', '惠州', '嘉兴', '南通', '中山', '保定', '兰州', '台州', '徐州', '太原', '绍兴', '烟台', '廊坊'
];

const cities = [
  'Sydney', 'Melbourne', 'Canberra', 'Rome', 'Milan', 'Naples', 'Berlin',
  'Munich', 'Hamburg', 'Hanover', 'Frankfurt', 'London', 'Dover', 'Cambridge',
  'Southampton', 'Liverpool', 'Turin', 'Venice', 'Florence', 'Copenhagen',
  'Aalborg', 'Stockholm', 'Lund', 'Gothenburg', 'Sofia', 'Bern', 'Zurich',
  'Geneva', 'Poland'
];
describe('city函数', () => { 
  it('当isChinese参数为true时，返回中文城市名', () => { 
    const result = Mock.Random.city(true); 
    expect(ChineseCities).to.include(result); 
  }); 
   it('当isChinese参数为false时，返回英文城市名', () => { 
    const result = Mock.Random.city(false); 
    expect(cities).to.include(result); 
  });  
}); 


describe('name函数', () => { 
  it('当isChinese参数为true时，返回中文名', () => { 
    const result = Mock.Random.name(2,true); 
    expect(result).toMatch(/[\u4e00-\u9fa5]+/); 
  }); 
  it('当isChinese参数为false时，返回英文名', () => { 
    const result = Mock.Random.name(3,false); 
    expect(result).toMatch(/[a-zA-Z]+/); 
  }); 
  function hasChineseOrEnglish(str) {
    return /[\u4e00-\u9fa5]+/.test(str) || /[a-zA-Z]+/.test(str);
  }
  it('没参数时', () => { 
    const result = Mock.Random.name(); 
    expect(hasChineseOrEnglish(result)).toBe(true);
  });  
  it('名字数大于3', () => { 
    const result = Mock.Random.name(5,true); 
    expect(result).toMatch(/[\u4e00-\u9fa5]+/); 
    expect(result.split('').length === 3).toBe(true); 
  }); 
  it('名字数小于2', () => { 
    expect(() => Mock.Random.name(1, true)).toThrowError(); 
  });
});

