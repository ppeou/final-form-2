import React, {memo, useMemo} from 'react';
import {Field} from 'react-final-form';
import createIidGenerator from './iid';
import makeItSlow from './make-it-slow';
import Section from './section';
import TextInput from './text-input';
import {createIsPropEqual} from './util';


const newIid = createIidGenerator();
const valueOnlySubscription = {value: true};

const createWithField = (Component, options = {subscription: valueOnlySubscription}) => {
  const {subscription} = options;
  const ComponentWithField = ({metaData = {}, index, children, items}) => {
    const {dataField: _dataField} = metaData;
    const dataField = _dataField || newIid();
    const memoizeMetaData = useMemo(() => ({...metaData}), [metaData]);
    return (<Field name={dataField}
                   subscription={subscription}
                   items={items}
                   metaData={memoizeMetaData}
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
  //'input:text': TextInput
};


const isEqualCreator = (fields= []) => {
  return (p, c) => fields.every(k => p[k] === c[k]);
};

const RenderComponent = (item, index) => {
  const {component} = item;
  const Component = componentNameMap[component];
  if (Component) {
    return <Component {...item} index={index}/>;
    //const com = <Component {...item} index={index}/>;
    //return memo(com, createIsPropEqual('item', 'index'));
  } else {
    console.error(component, 'not found');
    return null;
  }
};

const Render = (layout, index) => {
  return layout.map((item, index) => RenderComponent(item, index));
  //const memoizeChildren = useMemo(() => layout.map((item, index) => RenderComponent(item, index)), [layout, index])
  //return memoizeChildren;
};

const LayoutRender = ({layout}) => {
  const memoizedLayout = useMemo(() => Render(layout), [layout]);
  return memoizedLayout;
};

export {
  LayoutRender as default,
  Render, RenderComponent
};