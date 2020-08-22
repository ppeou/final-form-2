import React, {useEffect, useMemo} from 'react';
import {useField,useForm} from 'react-final-form';
import {get} from 'lodash';

const dataEffectCreator = (subscribeTo = null, callback) => ({subscribeTo, callback});

const whenFirstNameIsHelloEffect = dataEffectCreator('profileData.firstName',
  ({ change, dataField, value }) => {
  if(value && value.toLowerCase() === 'hello') {
    change(dataField, 'World');
  }
});

const profileDataEffects = {
  'profileData.lastName': whenFirstNameIsHelloEffect
};

const DataEffect = ({callback, dataField, subscribeTo}) => {
  const {batch, change, getState} = useForm();
  const {input: {value}, meta: {modified}} = useField(subscribeTo, {
    subscription: {modified: true, value: true}
  });

  useEffect(() => {
    if(!modified) return;
    batch(() => {
      callback({change, dataField, subscribeTo, value});
    });
  }, [value, modified]);
  return null;
};

const DataEffects = ({effects}) => {
  const memoEffects = useMemo(() => Object.entries(effects).map(([dataField, {callback, subscribeTo}]) => (
      <DataEffect key={dataField}
                  callback={callback}
                  dataField={dataField}
                  subscribeTo={subscribeTo} />
    )), [effects]);
  return memoEffects;
}


export {
  DataEffect,
  DataEffects,
  profileDataEffects
};