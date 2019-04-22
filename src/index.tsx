/// <reference path="./typings/custom/global.d.ts" />

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Cars from './containers/Cars/Container';
import { initStore } from './state/store';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = initStore();

const client = new ApolloClient({
  uri: 'https://fcg-fe-test.herokuapp.com/',
})

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Cars />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
