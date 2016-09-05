import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SearchApp from './containers/SearchApp';
import configureStore from './store/configureStore';

const store = configureStore();
const search = document.getElementById('search');

if (search) {
  render(
    <Provider store={ store }>
      <SearchApp />
    </Provider>,
    search
  );
}
