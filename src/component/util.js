import {isEqual} from 'lodash';

const createObject = (fields, data) => fields.reduce((p,f) => {p[f] = data[f]; return p;}, {});
const createIsPropEqual = (fields) => {
  return (a, b) => {
    const aa = createObject(fields,a);
    const bb = createObject(fields,b);
    return isEqual(aa,bb);
  }
};

export {createIsPropEqual};