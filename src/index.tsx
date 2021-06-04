import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer } from 'miragejs';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return (
        {
          id: 1,
          title: 'Transaction 1',
          amlount: 400,
          type: 'Deposit',
          category: 'Food',
          create_at: new Date()
        }
      )
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
