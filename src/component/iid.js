let iid = 0;
const createIidGenerator = (prefix= 'iid') => {
  return () => `${prefix}-${iid++}`;
};

export default createIidGenerator;