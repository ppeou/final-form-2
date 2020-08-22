import {debounce, flowRight, isEqual} from 'lodash';
import React, {memo, useCallback, useMemo, useRef} from 'react';
import {Field} from 'react-final-form';


const LayoutReactionRaw = ({callback, dataField, fieldNames, getValues, onChange}) => {
  //const {getEntitlement} = useEntitlement();
  const handleChange = useCallback(() => {
    const values = getValues();
    const changeQueue = [];
    const changeMeta = (metaDataPath, value) => changeQueue.push({metaDataPath, value});

    //callback({values, changeMeta, getEntitlement});
    callback({values, changeMeta});

    onChange((deltas = {}) => {
      if (isEqual(deltas[dataField], changeQueue)) {
        return deltas
      }
      return {...deltas, [dataField]: changeQueue};
    });
    return null;
  }, [callback, dataField, /*getEntitlement,*/ getValues, onChange]);

  return fieldNames.map(fieldName => (
    <Field
      key={fieldName}
      name={fieldName}
      render={handleChange}
      afterSubmit={handleChange}
      subscription={subscription}
    />
  ));
};
const LayoutEffect = memo(LayoutReactionRaw);

const LayoutEffects = ({effects, onChange, scopeName}) => {
  const values = useRef({});
  const getNewDeltaRef = useRef();
  const getValues = useCallback(() => values.current, []);
  const updateCache = useCallback(({input: {value}}) => {
    values.current = value;
    return null;
  }, []);

  const debounceOnChange = useMemo(
    () =>
      debounce(() => {
        onChange(getNewDeltaRef.current);
        getNewDeltaRef.current = undefined;
      }, 50),
    [onChange]
  );

  const handleChange = useCallback(func => {
      if (getNewDeltaRef.current instanceof Function) {
        getNewDeltaRef.current = flowRight(func, getNewDeltaRef.current);
      } else {
        getNewDeltaRef.current = func;
      }
      debounceOnChange();
    },
    [debounceOnChange]
  );

  return (<>
    <Field name={scopeName} render={updateCache} subscription={subscription}/>
    {
      Object.entries(effects).map(([dataField, reaction]) => (
          <LayoutEffect
            callback={reaction.callback}
            dataField={dataField}
            fieldNames={reaction.subscribeTo}
            getValues={getValues}
            key={dataField}
            onChange={handleChange}
          />
        )
      )
    }
  </>);
};