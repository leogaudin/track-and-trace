import './App.css';
import React, {useState, useEffect} from 'react';
import { createTheme } from './theme/index';
import { ThemeProvider } from '@emotion/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { SideNav } from './components/SideNav';
import Home from './pages/Home';
import Boxes from './pages/Boxes';
import { getBoxes, getScans } from './service';

const theme = createTheme();

function App() {
  const [boxes, setBoxes] = useState([]);
	const [scans, setScans] = useState([]);

	useEffect(() => {
		getBoxes()
			.then(setBoxes)
		getScans()
      .then(setScans)
	}, [])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SideNav />
          <Routes>
            <Route path='/' element={<Home boxes={boxes} scans={scans}/>} />
            <Route path='/boxes' element={<Boxes boxes={boxes} scans={scans}/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
