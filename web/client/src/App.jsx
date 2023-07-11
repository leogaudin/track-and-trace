import './App.css';
import React from 'react';
import { createTheme } from './theme/index';
import { ThemeProvider } from '@emotion/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { SideNav } from './components/SideNav';
import Home from './pages/Home';
import Boxes from './pages/Boxes';
import Scans from './pages/Scans';
import Login from './pages/Login';
// import Register from './pages/Register';
import Export from './pages/Export';
import RequireAuth from './components/RequireAuth';
import Logout from './pages/Logout';
import {Helmet} from 'react-helmet';
import { useMediaQuery } from '@mui/material';
import TopMenu from './components/TopMenu';
import { AppProvider } from './context/AppContext';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Track-and-Trace</title>
        <meta name="description" content="Track and trace packages with ease using our advanced web application. Stay updated on the status and location of your shipments in real-time. Effortlessly monitor delivery progress and gain peace of mind knowing where your packages are at all times." />
      </Helmet>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppProvider theme={theme} useMediaQuery={useMediaQuery}>
            <TopMenu />
            <SideNav />
            <Routes>
              <Route path='/' element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              } />
              <Route path='/boxes' element={
                <RequireAuth>
                  <Boxes />
                </RequireAuth>
              } />
              <Route path='/scans' element={
                <RequireAuth>
                  <Scans />
                </RequireAuth>
              } />
              <Route path='/export' element={
                  <RequireAuth>
                    <Export />
                  </RequireAuth>
                }
              />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/register' element={<Register />} /> */}
              <Route path='/logout' element={<Logout />} />
            </Routes>
          </AppProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
