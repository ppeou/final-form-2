import React from 'react';
import {createStore} from 'redux';
import {Provider as ReactReduxProvider} from 'react-redux';
import counterReducer, {actionCreator} from './counter-reducer';

const store = createStore(counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);
const {dispatch} = store;
const actions = actionCreator(dispatch);

const Provider = ({children}) => {
  return (<ReactReduxProvider store={store}>{children}</ReactReduxProvider>);
};

Provider.whyDidYouRender = true;

export {Provider, store};
export default actions;