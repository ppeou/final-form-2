import React, {useRef} from 'react';
import './style.css';
import {useSelector} from 'react-redux';
import counterAction from '../provider/redux';

const CounterWithRedux = () => {
  const customValueRef = useRef(null);
  const seed = useSelector(state => state);

  const setValue = () => {
    counterAction.set(customValueRef.current.value || 0);
  };

  return (
    <div>
      <h3>Counter-Redux</h3>
      <p>Counter: {seed}</p>
      <div className="button-section">
        <button onClick={() => counterAction.reset()}>Reset Counter</button>
        <button onClick={() => counterAction.increase()}>Increase by 1</button>
        <button onClick={() => counterAction.decrease()}>Decrease by 1</button>
        <span> or </span>
        <button onClick={setValue}>Set Value</button>
        <input type="number" ref={customValueRef}/>
      </div>
    </div>
  );

};

CounterWithRedux.whyDidYouRender = true;

export default CounterWithRedux;