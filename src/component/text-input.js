import React, {memo, useMemo} from 'react';
import makeItSlow from './make-it-slow';
import {createIsPropEqual} from './util';

const TextInput = (props) => {
  const {index, metaData, input} = props;
  const {label, disabled, cssClasses = ''} = metaData;
  console.log('cssClasses', label, cssClasses);
  useMemo(() => makeItSlow(), []);

  return (<div key={index} className={cssClasses}>
    <label>{label}:</label>
    <input {...input} disabled={disabled} autoComplete=""/>
  </div>);
};
TextInput.whyDidYouRender = true;

const MemoTextInput = memo(TextInput, createIsPropEqual(['index','metaData', 'input']));
export default MemoTextInput;
//export default TextInput;