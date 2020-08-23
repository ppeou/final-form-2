import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';

const TextEmail = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [value, setValue] = useState('');

  const inputHandler = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  }

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return value;
      },
      afterGuiAttached: () => {
        setValue(props.value);
        inputRef.current.focus();
        inputRef.current.select();
      }
    };
  });

  return (
    <input
      type="email"
      className="ag-input-field-input ag-text-field-input"
      ref={inputRef}
      onChange={inputHandler}
      value={value}
      placeholder={'Enter ' + props.column.colId}
    />
  )
});
TextEmail.whyDidYouRender = true;

//export default TextInputWithField;
//export default TextInputWithHook;
//export default createWithField(TextEmail);
export default TextEmail;