import React, {useRef, useMemo, memo, useCallback} from 'react';
import {Field} from 'react-final-form';
import {get, isEqual, debounce, flowRight} from 'lodash';


const subscription = {value: true};
const layoutEffectCreator = (subscribeTo = '', callback) => ({subscribeTo, callback});

const lastNameEffect = layoutEffectCreator('profileData.firstName',
  ({changeMeta, subscribeTo, values}) => {
    console.log('lastNameEffect', subscribeTo, values);
    const value = (values === 'sammy') ? 'blue' : '';
    changeMeta('cssClasses', value);
  });
const profileLayoutEffects = {
  'profileData.lastName': lastNameEffect
};

const LayoutEffect = ({callback, dataField, subscribeTo, onChange}) => {
  const changeQueue = [];
  const changeMeta = (metaDataPath, value) => {changeQueue[0] = {metaDataPath, value}};
  const handleChange = useCallback(({input: {value}}) => {
    callback({changeMeta, values: value, subscribeTo});
    onChange({dataField, ...changeQueue[0]});

    return null;
  }, [callback, onChange, dataField]);
  return (<Field
    key={subscribeTo}
    name={subscribeTo}
    render={handleChange}
    afterSubmit={handleChange}
    subscription={subscription}
  />);
};


const LayoutEffects = ({scopeName, onChange, effects}) => {
  const updateCache = () => null;
  return Object.entries(effects).map(([dataField, {callback, subscribeTo}]) =>(<LayoutEffect
      key={dataField}
      callback={callback}
      dataField={dataField}
      subscribeTo={subscribeTo}
      onChange={onChange}
    />)
  );
};

export {
  LayoutEffect,
  LayoutEffects,
  profileLayoutEffects
};