import React from 'react';
import ReactDOM from 'react-dom';
import SearchApp from './SearchApp';

const search = document.getElementById('search');

if (search) {
  ReactDOM.render(
    <SearchApp />,
    document.getElementById('search')
  );
}
