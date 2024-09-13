import React from 'react';
import ReactDOM from 'react-dom/client';
import { ViewRouter } from 'core_provider/layouts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ViewRouter />
  </React.StrictMode>,
);
