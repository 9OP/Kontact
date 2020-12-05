import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import store from './store';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
