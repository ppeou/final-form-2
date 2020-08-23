import {isEqual} from 'lodash';

const createObject = (fields, data) => fields.reduce((p,f) => {p[f] = data[f]; return p;}, {});
const createIsPropEqual = (fields) => {
  console.log('fields', fields);
  return (a, b) => {
    console.log(a,b);
    const aa = createObject(fields,a);
    const bb = createObject(fields,b);
    console.log('isEqual', isEqual(aa,bb));
    return isEqual(aa,bb);
  }
};

export {createIsPropEqual};