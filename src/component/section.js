import React, {useMemo} from 'react';
import {Field, useField} from 'react-final-form';
import makeItSlow from './make-it-slow';
import createIidGenerator from './iid';
import {createWithField, createWithHook} from './field-wrapper';

const newIid = createIidGenerator();

const Section = ({children, index, metaData, ...props}) => {
  const {label, dataField} = metaData;
  const {input} = props;
  return (<div className="section" field-label={label}>
    <h1>Hello {JSON.stringify((input || {}).value)} {dataField}</h1>
    {children}
  </div>);
};
Section.whyDidYouRender = true;

const SectionWithField = ({metaData={}, index, children}) => {
  const {dataField} = metaData;
  makeItSlow();
  console.log('SectionWithField');

  return (<Field name={dataField} key={index}>
    {
      (prop) => {
        return (<Section
          metaData={metaData}
          children={children}
          {...prop}
          index={index}/>);
      }
    }
  </Field>);
};
SectionWithField.whyDidYouRender = true;

const SectionWithHook = ({metaData={}, index, children}) => {
  const {dataField} = metaData;
  const {prop} = useField(dataField || newIid(),  {subcription:{value: true}});
  useMemo(() => {makeItSlow();}, [metaData]);
  console.log('SectionWithHook');

  return (<Section metaData={metaData} {...prop} children={children} index={index}/>);
};
SectionWithHook.whyDidYouRender = true;


//export default SectionWithHook;
//export default createWithField(Section);
export default createWithHook(Section);