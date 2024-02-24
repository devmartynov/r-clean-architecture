import React from 'react'
import ReactDOM from 'react-dom/client'
import createApp from './App.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {createApp()}
  </React.StrictMode>,
);
