import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 2,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'dev',
          amount: 5000,
          createAt: new Date('2021-06-01'),
        },
        {
          id: 3,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Conta',
          amount: 1000,
          createAt: new Date('2021-06-03'),
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return (
        this.schema.all('transaction')
      )
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
