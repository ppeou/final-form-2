import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    onlyLogs: true,
    titleColor: "green",
    diffNameColor: "darkturquoise",
    trackAllPureComponents: true,
    trackExtraHooks: [
      [require('../node_modules/react-redux/lib/index.js'), 'useSelector']
    ]
  });
}