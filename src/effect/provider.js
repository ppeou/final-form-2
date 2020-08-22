import React, {createContext, useCallback, useEffect, useMemo, useReducer, useState, memo, useRef} from 'react';
import {mapValues, cloneDeep, get, set, isEqual} from 'lodash';
import {findLayout, traverseItemsToFields} from './find-layout';
import {DataEffects, DataEffect} from './data-effect';
import {LayoutEffects} from './layout-effect';

const useChangeLayout = (layout) => {
  const [state, setState] = useState(layout);
  const updateMetaData = useCallback(({dataField, metaDataPath, value}) => {
    if(dataField) {
      const newLayout = cloneDeep(state);
      const targetItem = findLayout({'metaData.dataField': dataField}, newLayout);
      set(targetItem, `metaData.${metaDataPath}`, value);
      setState(currentLayout => isEqual(currentLayout, newLayout) ? currentLayout : newLayout);
    }
  }, [state, setState]);

  return {metaData: state, updateMetaData};
};

const SideEffectProvider = ({
                              baseMetaDataBranch, children, dataEffects, layoutEffects, scopeName
                            }) => {

  const {metaData: metaDataBranch, updateMetaData} = useChangeLayout(baseMetaDataBranch);

  const memoChildren = useMemo(() => children(metaDataBranch), [children, metaDataBranch]);
  return (<>
    <DataEffects effects={dataEffects} />
    <LayoutEffects scopeName={scopeName} onChange={updateMetaData} effects={layoutEffects}/>
    {memoChildren}
  </>);


};

const MemoSideEffectProvider = memo(SideEffectProvider);

export {
  SideEffectProvider,
  MemoSideEffectProvider
};