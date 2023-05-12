import './App.css';
import React, {useState, useEffect} from 'react';
import { createTheme } from './theme/index';
import { ThemeProvider } from '@emotion/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { SideNav } from './components/SideNav';
import Home from './pages/Home';
import Boxes from './pages/Boxes';
import Scans from './pages/Scans';
import Login from './pages/Login';
import Register from './pages/Register';
import { getBoxes, getScans } from './service';
import RequireAuth from './components/RequireAuth';

const theme = createTheme();

function App() {
  const [boxes, setBoxes] = useState([]);
	const [scans, setScans] = useState([]);

  useEffect(() => {
		getBoxes()
			.then(res => setBoxes(res.data))
		getScans()
    .then(res => setScans(res.data))
	}, [])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SideNav />
          <Routes>
            <Route exact path='/' element={
              <RequireAuth>
                <Home boxes={boxes} scans={scans}/>
              </RequireAuth>
            } />
            <Route exact path='/boxes' element={
              <RequireAuth>
                <Boxes boxes={boxes} scans={scans}/>
              </RequireAuth>
            } />
            <Route exact path='/scans' element={
              <RequireAuth>
                <Scans boxes={boxes} scans={scans}/>
              </RequireAuth>
            } />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
