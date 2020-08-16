import React, {useMemo} from 'react';
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
                   key={index} />);
  };

  return ComponentWithField;
};

const createWithHook = (Component) => {
  const ComponentWithField = ({metaData = {}, index, children, items}) => {
    const {dataField} = metaData;
    const prop = useField(dataField || newIid(),  {subcription:{value: true}});
    makeItSlow();
    console.log('createWithHook', dataField);
    return (<Component metaData={metaData}
                       children={children}
                       index={index} items={items}
                       {...prop}
                       key={index} />);
  };

  return ComponentWithField;
};

createWithField.whyDidYouRender = true;
createWithHook.whyDidYouRender = true;
export {createWithField, createWithHook};