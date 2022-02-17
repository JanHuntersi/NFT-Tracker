import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId="mTk0bxf7T5quoQURocD1jT1EnE6KoBh5wDJc6nUD" serverUrl="https://51rapn7enz8b.usemoralis.com:2053/server">
    <ChakraProvider>
  <AuthProvider>
    <App />
    </AuthProvider>
 </ChakraProvider>
  
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

