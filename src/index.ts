import  Handler  from './mock/basic';
import  Random  from './random/index';


const Mock = {
  Handler,
  Random,
  mock,
}

function mock (template: object) {
  return Handler.gen(template)
}

export default Mock