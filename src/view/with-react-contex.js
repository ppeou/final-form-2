import React, {useContext} from 'react';
import Context from '../provider/react-context';

const withReactContext = (Component) => {
  return () => {
    const {state: seed, action: counterAction} = useContext(Context);
    return (<>
      <h3>With-React-Context</h3>
      <Component seed={seed} action={counterAction}/>
      </>
    );
  };
};

export default withReactContext;
