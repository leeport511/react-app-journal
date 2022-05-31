import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';


import { JournalApp } from './JournalApp';
import './styles/styles.scss';
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <JournalApp />

  </Provider>
  
);


