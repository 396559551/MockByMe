
import { pick } from "src/utils";

export const city = function (isChinese: boolean): string {
  return isChinese? 
  pick(ChineseCities) as string: 
  pick(cities) as string;
}


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