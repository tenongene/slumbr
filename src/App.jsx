import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';
// Import pages
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Education from './pages/Education';
import Profile from './pages/Profile';
import History from './pages/History';
import Logs from './pages/Logs';



function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route  path="/signin" element={<SignIn />} />
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/education" element={<Education />} />
        <Route  path="/history" element={<History />} />
        <Route  path="/logs" element={<Logs />} />
        <Route  path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
