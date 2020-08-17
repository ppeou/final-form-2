import React, {memo, useMemo} from 'react';
import {Field, useField} from 'react-final-form';
import makeItSlow from './make-it-slow';
import createIidGenerator from './iid';

const newIid = createIidGenerator();

const createWithField = (Component) => {
  const ComponentWithField = ({metaData = {}, index, children, items}) => {
    const {dataField: _dataField} = metaData;
    const dataField = _dataField || newIid();
    makeItSlow();
    console.log('createWithField');
    return (<Field name={dataField} items={items}
                   metaData={metaData}
                   children={children} index={index}
                   component={Component}
                   index={index}
                   key={index}/>);
  };

  return ComponentWithField;
};
const isEqualCreator = (fields) => (p, n) => {
  const result = fields.every(k => {
    if(p[k] !== n[k]) {
      console.log(k, p[k], n[k]);
    }
    return p[k] === n[k];
  });
  console.log('isEqual', result);
  return result;
};

const createWithHook = (Component) => {

  const ComponentWithField = ({metaData, index, children, items}) => {
    const {dataField} = metaData || {};
    const {input, meta} = useField(dataField || newIid(), {subcription: {value: true}});

    makeItSlow();
    console.log('createWithHook', dataField);
    const compInfo = {metaData, children, items, input, meta};
    return (<Component {...compInfo} key={index}/>);
  };

  ComponentWithField.whyDidYouRender = true;

  //return ComponentWithField;
  return React.memo(ComponentWithField, isEqualCreator(['metaData', 'index', 'children', 'items']));
};

createWithField.whyDidYouRender = true;
createWithHook.whyDidYouRender = true;
export {createWithField, createWithHook};