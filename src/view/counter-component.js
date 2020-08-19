import React, {useRef} from 'react';

const CounterComponent = ({seed, action}) => {
  const customValueRef = useRef(null);

  const setValue = () => {
    action.set(customValueRef.current.value || 0);
  };

  return (
    <div>
      <p>Counter: {seed}</p>
      <div className="button-section">
        <button onClick={() => action.reset()}>Reset Counter</button>
        <button onClick={() => action.increase()}>Increase by 1</button>
        <button onClick={() => action.decrease()}>Decrease by 1</button>
        <span> or </span>
        <button onClick={setValue}>Set Value</button>
        <input type="number" ref={customValueRef}/>
      </div>
    </div>
  );

};

export default CounterComponent;