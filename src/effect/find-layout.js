import {get} from 'lodash';

const findLayoutItem = (criteria, layout) => {

  const {items = []} = layout;

  const match = Object.keys(criteria).every(k => criteria[k] === get(layout, k));
  if(match) {
    return layout;
  } else {
    for(let i = 0; i < items.length; i++) {
      const subLayout = items[i];
      const found = findLayoutItem(criteria, subLayout);
      if(found) {
        return found;
      }
    }
    return false;
  }
};


const findLayout = (criteria, layout) => {
  return findLayoutItem(criteria, layout[0]);
};


const traverse = (path, items, callback) => {
  items.forEach((item, index) => {
    if(item.metaData) {
      callback(`${path.concat(index).join('.')}`, item.metaData);
      const childItems = get(item, 'items', []);
      if(childItems.length > 0) {
        traverse(path.concat(index, 'items'), childItems, callback);
      }
    }
  });
};

const traverseItemsToFields = (layout, fieldCallback) => {
  traverse([], layout, fieldCallback);
};

export {findLayout, traverseItemsToFields};