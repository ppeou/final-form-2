import React, {useMemo} from 'react';
import makeItSlow from './make-it-slow';
import {Render} from './render';


const Section = (props) => {
  const {index, metaData, items} = props;
  const {label} = metaData;
  makeItSlow();
  const children = useMemo(() => items.map((cComp, idx) => Render(cComp, idx)), [items]);
  return (<div className="section" key={index}>
    <h1>{label}</h1>
    {children}
  </div>);
};
Section.whyDidYouRender = true;

export default Section;