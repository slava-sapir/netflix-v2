import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { handleResponseWithLoginCheck } from './services/base.service';

handleResponseWithLoginCheck();
ReactDOM.render (
 //   <App />, document.getElementById('root'));
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>, 
      document.getElementById('root')
);
   