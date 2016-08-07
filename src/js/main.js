import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Widget';

import "../scss/main.scss";
window.console.log("Webpack works!");

ReactDOM.render(
  <Widget />,
  document.getElementById('component')
);
