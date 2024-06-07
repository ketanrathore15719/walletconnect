import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TransactionsProvider } from "./context/TransactionContext";
//import 'flowbite';
import { MoralisProvider } from "react-moralis";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <MoralisProvider appId="MOFqC9AGiiWxmHEprWlmfcYPJ5LGJGhWzN3XVziu" serverUrl="https://s538kkymvrsk.usemoralis.com:2053/server">
          <App />
    </MoralisProvider>
    </TransactionsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
