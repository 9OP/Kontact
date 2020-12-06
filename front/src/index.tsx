import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { rootReducer, enhancer } from './store';
import App from './app';

const store = createStore(
  rootReducer,
  enhancer,
);

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
