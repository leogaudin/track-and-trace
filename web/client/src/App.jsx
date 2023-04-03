import './App.css';
import React, {useState} from 'react';
import { createTheme } from './theme/index';
import { ThemeProvider } from '@emotion/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { SideNav } from './components/SideNav';
import Home from './pages/Home';
import Boxes from './pages/Boxes';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SideNav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/boxes' element={<Boxes />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
