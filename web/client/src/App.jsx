import './App.css';
import React from 'react';
import { createTheme } from './theme/index';
import { ThemeProvider } from '@emotion/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { SideNav } from './components/SideNav';
import Home from './pages/Home';
import Boxes from './pages/Boxes';
import Scans from './pages/Scans';
import PublicInsights from './pages/PublicInsights';
import Login from './pages/Login';
// import Register from './pages/Register';
import Export from './pages/Export';
import RequireAuth from './components/RequireAuth';
import Logout from './pages/Logout';
import {Helmet} from 'react-helmet';
import TopMenu from './components/TopMenu';
import { AppProvider } from './context/AppContext';
import Delete from './pages/Delete';
import "./components/constants/language";
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const theme = createTheme();

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <Helmet>
        <title>Track-and-Trace</title>
        <meta name="description" content={t('description')} />
      </Helmet>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppProvider theme={theme} >
            <TopMenu />
            <SideNav />
            <ToastContainer />
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
              <Route path='/insights/:id' element={
                  <PublicInsights />
                }
              />
              <Route path='/export' element={
                  <RequireAuth>
                    <Export />
                  </RequireAuth>
                }
              />
              <Route path='/delete' element={
                  <RequireAuth>
                    <Delete />
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
