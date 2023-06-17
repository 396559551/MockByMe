import { it, expect, describe } from 'vitest';
import Mock from '../src/index'

describe('Mock.mock',() => {
  it('模版1', () => {
     let result = Mock.mock({
        "ttt|1-5": "★"
      })
      expect('★★★★★★').to.include(result.ttt);
    });
    it('模版2', () => {
      let result = Mock.mock({
        'object1|2-4': {
          '110000': '北京市',
          '120000': '天津市',
          '130000': '河北省',
          '140000': '山西省'
        },
       })
       expect(Object.keys(result).length).toBeGreaterThanOrEqual(1);
      expect(Object.keys(result).length).toBeLessThanOrEqual(4);
     });
    it('3', function() {
      let tpl = {
          'list|1-10': [{
              'id|+1': 1,
          }]
      }
      let data = Mock.mock(tpl)
      expect(data).to.have.property('list')
          .that.be.an('array').with.length.within(1, 10)
          for (let i = 1; i < data.list.length; i++) { 
            expect(data.list[i].id).to.equal(data.list[i - 1].id + 1); 
          } 
    })
    it('4', function() {
      let tpl = {
        'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
      }
      let data = Mock.mock(tpl)
      expect(['GET', 'POST', 'HEAD', 'DELETE']).to.includes(data.method)
    })

    it('4', function() {
      let tpl = {
        'float2|1-100.1-10': 1,
      }
      let data = Mock.mock(tpl)
      let result= data.float2.toString()
      let intPart = Number(result.split('.')[0])
      let dPart = result.split('.')[1].split('')
      expect(intPart).toBeGreaterThanOrEqual(1);
      expect(intPart).toBeLessThanOrEqual(100);
      expect(dPart.length).toBeGreaterThanOrEqual(1);
      expect(dPart.length).toBeLessThanOrEqual(10);

    })

    it('5', function() {
      let tpl = {
        'name|1': true
      }
      let data = Mock.mock(tpl)
      expect(data.name).toBeTypeOf('boolean');
    })
    it('5', function() {
      let tpl = {
        'tt|1-10': '',
      }
      let data = Mock.mock(tpl)
      let result = data.tt
      expect(result).toBeTypeOf('string');
      expect(result.split('').length).toBeGreaterThanOrEqual(1);
      expect(result.split('').length).toBeLessThanOrEqual(10);
    })
    

    it('5', function() {
      let tpl = {
        'data|+1': [{a:1}, {b:2}]
      }
      let data = Mock.mock(tpl).data
      let obj1={a:1}
      let obj2={b:2}
      expect(data).toEqual(obj1 || obj2) 
    })
    it('5', function() {
      let tpl = {
        'tt|1-10': '',
      }
      let data = Mock.mock(tpl)
      let result = data.tt
      expect(result).toBeTypeOf('string');
      expect(result.split('').length).toBeGreaterThanOrEqual(1);
      expect(result.split('').length).toBeLessThanOrEqual(10);
    })
})
