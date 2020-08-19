import React, {createContext, useReducer} from 'react';
import counterReducer, {initialState, actionCreator} from './counter-reducer';

const Context = createContext('counter');

const Provider = ({children}) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const action = actionCreator(dispatch);
  return (<Context.Provider value={{state, action}}>{children}</Context.Provider>);
};


Provider.whyDidYouRender = true;

export {Provider};
export default Context;