import * as basic from './basicDataType/index';
import * as date from './date';
import * as bytes from './bytes';
import * as  ip from './ip';
import * as  mac from './mac';
import * as  name from './name';
import * as  city from './city';

const Random = {
  ...basic,
  ...date,
  ...bytes,
  ...ip,
  ...mac,
  ...name,
  ...city,
}

export default Random;