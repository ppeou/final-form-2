import React, {useRef, useContext} from 'react';
import './style.css';
import Context from '../provider/react-context';

const CounterWithReactContext = () => {
  const customValueRef = useRef(null);
  const {state: seed, action: counterAction} = useContext(Context);

  const setValue = () => {
    counterAction.set(customValueRef.current.value || 0);
  };

  return (
    <div>
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

CounterWithReactContext.whyDidYouRender = true;

export default CounterWithReactContext;