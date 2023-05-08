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
            <Route path='/' element={<Home boxes={boxes} scans={scans}/>} />
            <Route path='/boxes' element={<Boxes boxes={boxes} scans={scans}/>} />
            <Route path='/scans' element={<Scans boxes={boxes} scans={scans}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
