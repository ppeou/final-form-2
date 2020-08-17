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
  return ComponentWithList;
}

const Dropdown = ({children, index, metaData, list, ...props}) => {
  const {label, fieldId, fieldName} = metaData;
  const {input} = props;
  return (<div>
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

const DropdownWithField = ({index, metaData}) => {
  const {dataField, dataSource} = metaData;
  const _list= list[dataSource] || [];
  makeItSlow();

  return (<Field name={dataField}>
    {
      (prop) => {
        return (<Dropdown metaData={metaData} index={index} {...prop} list={_list} />);
      }
    }
  </Field>);
};

const DropdownWithHook = ({index, metaData}) => {
  const {dataField, dataSource} = metaData;
  const _list= list[dataSource] || [];
  const prop = useField(dataField, {subscription: {value:true}});
  useMemo(() => {makeItSlow();}, [metaData]);

  console.log('DropdownWithHook');
  return (<Dropdown metaData={metaData} index={index} {...prop} list={_list} />);
};

DropdownWithField.whyDidYouRender = true;
DropdownWithHook.whyDidYouRender = true;

//export default DropdownWithHook;
//export default createWithField(withList(Dropdown));
export default createWithHook(withList(Dropdown));