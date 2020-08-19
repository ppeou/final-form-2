const initialState = 0;
const [INCREASE, DECREASE, SET, RESET] = [
  '@@COUNTER/INCREASE',
  '@@COUNTER/DECREASE',
  '@@COUNTER/SET',
  '@@COUNTER/RESET',
];

const counterReducer = (state = initialState, action) => {
  const {type, value} = action;
  if (type === INCREASE) {
    return state + value;
  } else if (type === DECREASE) {
    return state - value;
  } else if (type === SET) {
    return value;
  } else if (type === RESET) {
    return initialState;
  }
  return state;
};

const actionCreator = (dispatch) => {
  return {
    increase: (value = 1) => dispatch({type: INCREASE, value}),
    decrease: (value = 1) => dispatch({type: DECREASE, value}),
    set: (value = 0) => dispatch({type: SET, value}),
    reset: () => dispatch({type: RESET})
  };
}

export {
  actionCreator,
  counterReducer as default,
  initialState
};