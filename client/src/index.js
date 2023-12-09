import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {store} from './redux/store/store'
import CssBaseline from '@mui/material/CssBaseline';
import {Web3Modal} from '@web3modal/react'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

const root = ReactDOM.createRoot(document.getElementById('root'));
const chains = [chain.mantleTestnet ];

  
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: process.env.REACT_APP_WEB3MODALID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});


const ethereumClient = new EthereumClient(wagmiClient, chains);
root.render(
  <Provider store={store}>
        <CssBaseline />
        <WagmiConfig client={wagmiClient}>
      <App />
      </WagmiConfig>
      <Web3Modal
        projectId={process.env.REACT_APP_WEB3MODALID}
        ethereumClient={ethereumClient}
      />
  </Provider>
   
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
