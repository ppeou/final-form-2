import React, {useMemo} from 'react';
import {Field, useField} from 'react-final-form';
import makeItSlow from './make-it-slow';
import {createWithField, createWithHook} from './field-wrapper';

const TextInput = ({index, metaData, ...props}) => {
  const {label} = metaData;
  const {input} = props;
  return (<div key={index}>
    <label>{label}:</label>
    <input {...input} />
  </div>);
};
TextInput.whyDidYouRender = true;

const TextInputWithField = ({index, metaData}) => {
  const {dataField} = metaData;
  makeItSlow();
  console.log('TextInputWithField');
  return (<Field name={dataField} key={index}>
    {
      (prop) => {
        return (<TextInput metaData={metaData} {...prop} index={index}/>);
      }
    }
  </Field>);
};
TextInputWithField.whyDidYouRender = true;

const TextInputWithHook = ({index, metaData}) => {
  const {dataField} = metaData;
  const prop = useField(dataField, {subscription: {value:true}});
  useMemo(() => {makeItSlow();}, [metaData]);

  console.log('TextInputWithHook');
  return (<TextInput metaData={metaData} {...prop} index={index} autofill="off"/>);
};
TextInputWithHook.whyDidYouRender = true;

//export default TextInputWithField;
//export default TextInputWithHook;
//export default createWithField(TextInput);
export default createWithHook(TextInput);