import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './pages/index.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { client } from './init/client';
import { ApolloProvider } from '@apollo/react-hooks';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,

  document.querySelector('.page__content')
);
