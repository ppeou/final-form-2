import React from 'react';
import {Provider as ReduxProvider} from './provider/redux';
import {Provider as ReactContextProvider} from './provider/react-context';
import CounterWithRedux from './view/counter-with-redux';
import CounterWithReactContext from './view/counter-with-react-context';
import CounterComponent from './view/counter-component';
import withRedux from './view/with-redux';
import withReactContext from './view/with-react-contex';
import './App.css';

const CounterComponentWithRedux = withRedux(CounterComponent);
const CounterComponentWithReactContext = withReactContext(CounterComponent);

function App() {
  return (
    <section>
      <ReduxProvider>
        <h1>Redux</h1>
        <div className="sub-section">
          <CounterWithRedux/>
          <hr/>
          <CounterComponentWithRedux/>
        </div>
      </ReduxProvider>
      <hr/>
      <ReactContextProvider>
        <h1>React-Context</h1>
        <div className="sub-section">
          <CounterWithReactContext/>
          <hr/>
          <CounterComponentWithReactContext/>
        </div>
      </ReactContextProvider>
    </section>
  );
}

App.whyDidYouRender = true;

export default App;
