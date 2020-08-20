import React, {useMemo} from 'react';
import {Field} from 'react-final-form';
import createIidGenerator from './iid';
import makeItSlow from './make-it-slow';
import Section from './section';
import TextInput from './text-input';


const newIid = createIidGenerator();
const valueOnlySubscription = {value: true};
const createWithField = (Component, options = {subscription: valueOnlySubscription}) => {
  const {subscription} = options;
  const ComponentWithField = ({metaData = {}, index, children, items}) => {
    const {dataField: _dataField} = metaData;
    const dataField = _dataField || newIid();
    return (<Field name={dataField}
                   subscription={subscription}
                   items={items}
                   metaData={metaData}
                   children={children}
                   component={Component}
                   index={index}
                   key={index}/>);
  };

  return ComponentWithField;
};

const componentNameMap = {
  'section': Section,
  'input:text': createWithField(TextInput)
};


const isEqualCreator = (fields= []) => {
  return (p, c) => fields.every(k => p[k] === c[k]);
};


const Render = (props, index) => {
  const {component} = props;
  const Component = componentNameMap[component];
  if (Component) {
    return Component({...props, index});
    //return (<Component {...props} index={index}/>);
  } else {
    console.error(component, 'not found');
    return null;
  }
};

const LayoutRender = ({layout}) => {
  return Render(layout);
};

export {
  LayoutRender as default,
  Render
};