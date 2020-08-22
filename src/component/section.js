import React, {memo, useMemo} from 'react';
import makeItSlow from './make-it-slow';
import {RenderComponent} from './render';
import {createIsPropEqual} from './util';


const Section = (props) => {
  const {index, metaData, items} = props;
  const {label} = metaData;
  makeItSlow();
  const children = items.map((cComp, idx) => RenderComponent(cComp, idx));
  return (<div className="section" key={index}>
    <h1>{label}</h1>
    {children}
  </div>);
};
Section.whyDidYouRender = true;
const MemoSection = memo(Section, createIsPropEqual(['index','metaData', 'items']));
export default MemoSection;
//export default Section;