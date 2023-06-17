import { pick } from 'src/utils';
import * as basic from './basicDataType/index';


export const name = function (nameNum?: number, isChinese?: boolean) {
  let name = '';
  if (!nameNum) {
    nameNum = basic.boolean() ? 2 : 3
  }
  if (nameNum < 2) {
   throw new  Error("Invalid")
  } else if (nameNum > 3) {
    nameNum = 3;
  }
  if (isChinese) {
    // 随机生成中文姓氏
    const surname = pick(chineseSurname)
    name += surname;
    // 随机生成中文名字
    for (let i = 0; i < nameNum - 1; i++) {
  
      name += pick(chineseLastNames);
    }
  } else {
    // 随机生成英文姓名
    const surname = pick(firstName)
    name += surname;
    // 随机生成英文名字
    for (let i = 0; i < nameNum - 1; i++) {
      name += pick(lastNames)
    }
  }
  return name 
}
const chineseSurname = [
  '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈',
  '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许',
  '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏',
  '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章',
  '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦',
  '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳',
  '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺',
  '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常',
  '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余',
  '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹'
];
const chineseLastNames = [
  "伟", "芳", "娜", "英", "敏", "静", "丽", "强",
  "磊", "军", "洋", "勇", "艳", "杰", "娟", "涛",
  "明", "超", "秀", "霞", "平", "刚", "英"
]
const firstName = [
  "James", "John", "Robert", "Michael", "William",
  "David", "Richard", "Charles", "Joseph", "Thomas",
  "Christopher", "Daniel", "Paul", "Mark", "Donald",
  "George", "Kenneth", "Steven", "Edward", "Brian",
  "Ronald", "Anthony", "Kevin", "Jason", "Matthew",
  "Gary", "Timothy", "Jose", "Larry", "Jeffrey",
  "Frank", "Scott", "Eric"
]


const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones",
  "Miller", "Davis", "Garcia", "Rodriguez", "Wilson",
  "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez",
  "Moore", "Martin", "Jackson", "Thompson", "White",
  "Lopez", "Lee", "Gonzalez", "Harris", "Clark",
  "Lewis", "Robinson", "Walker", "Perez", "Hall",
  "Young", "Allen"
]
