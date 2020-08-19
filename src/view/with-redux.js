import React from 'react';
import {useSelector} from 'react-redux';
import counterAction from '../provider/redux';

const withRedux = (Component) => {
  return () => {
    const seed = useSelector(state => state);
    return (<>
      <h3>With-Redux</h3>
      <Component seed={seed} action={counterAction}/>
    </>);
  }
};

export default withRedux;
