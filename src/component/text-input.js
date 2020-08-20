import React from 'react';
import makeItSlow from './make-it-slow';


const TextInput = (props) => {
  const {index, metaData, input} = props;
  const {label} = metaData;
  makeItSlow();
  return (<div key={index}>
    <label>{label}:</label>
    <input {...input}/>
  </div>);
};
TextInput.whyDidYouRender = true;

export default TextInput;