import React, {useMemo} from 'react';
import {Field, useField} from 'react-final-form';
import makeItSlow from './make-it-slow';
import {createWithField, createWithHook} from './field-wrapper';

const list= {
  states: [
    {id: 1, abbr: 'CA', name: 'California'},
    {id: 2, abbr: 'OH', name: 'Ohio'},
    {id: 3, abbr: 'FL', name: 'Florida'},
    {id: 4, abbr: 'TX', name: 'Texas'},
    {id: 4, abbr: 'NY', name: 'New York'},
  ]
};

const withList = (Component) => {
  const ComponentWithList = (props) => {
    const {dataSource} = props.metaData;
    const _list= list[dataSource] || [];
    return (<Component {...props} list={_list} />);
  };

  ComponentWithList.whyDidYouRender = true;
  return ComponentWithList;
}

const Dropdown = (props) => {
  const {index, metaData, list} = props;
  const {label, fieldId, fieldName} = metaData;
  const {input} = props;
  return (<div key={index}>
    <label>{label}:</label>
    <select {...input}>
      <option>---</option>
      {
        list.map((item, idx) => (<option key={idx} value={item[fieldId]}>{item[fieldName]}</option>))
      }
    </select>
  </div>);
};
Dropdown.whyDidYouRender = true;

export default withList(Dropdown);