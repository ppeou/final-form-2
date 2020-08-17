import React from 'react';
import {createWithField, createWithHook} from './field-wrapper';

const Button = ({index, metaData, ...props}) => {
  const {label} = metaData;
  const {input} = props;
  return input.value ? (<div key={index}>
    <button>{label}</button>
  </div>) : null;
};
Button.whyDidYouRender = true;

export default createWithHook(Button);
