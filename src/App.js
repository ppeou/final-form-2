import React from 'react';
import {Provider as ReduxProvider} from './provider/redux';
import {Provider as ReactContextProvider} from './provider/react-context';
import CounterWithRedux from './view/counter-with-redux';
import CounterWithReactContext from './view/counter-with-react-context';

function App() {
  return (
    <section>
      <ReduxProvider>
        <h1>Redux</h1>
        <CounterWithRedux/>
      </ReduxProvider>
      <hr />
      <ReactContextProvider>
        <h1>React-Context</h1>
        <CounterWithReactContext />
      </ReactContextProvider>
    </section>
  );
}

App.whyDidYouRender = true;

export default App;
