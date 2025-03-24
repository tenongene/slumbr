import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { DataProvider } from './utils/DataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <DataProvider>
          <App />
        </DataProvider> 
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
