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
import { getBoxesByAdminId, getScansByBoxes } from './service';
import RequireAuth from './components/RequireAuth';
import Logout from './pages/Logout';
import {Helmet} from 'react-helmet';
import { getCountryName } from './service';

const theme = createTheme();

function App() {
  const [boxes, setBoxes] = useState([]);
	const [scans, setScans] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const boxesResponse = await getBoxesByAdminId(user.id);
        setBoxes(boxesResponse.data);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status >= 400)
          setBoxes(null);
      }

      try {
        const boxesResponse = await getBoxesByAdminId(user.id);
        const boxIds = boxesResponse.data.map(box => box.id);
        const scansResponse = await getScansByBoxes(boxIds);
        const scans = scansResponse.data;

        const updatedScans = [];
        for (const scan of scans) {
          const { latitude, longitude } = scan.location.coords;
          const name = await getCountryName({latitude, longitude});
          const updatedScan = { ...scan, countryName: name['country'] };
          updatedScans.push(updatedScan);
        }

        setScans(updatedScans);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status >= 400)
          setScans(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Track-and-Trace</title>
        <meta name="description" content="Track and trace packages with ease using our advanced web application. Stay updated on the status and location of your shipments in real-time. Effortlessly monitor delivery progress and gain peace of mind knowing where your packages are at all times." />
      </Helmet>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SideNav />
          <Routes>
            <Route path='/' element={
              <RequireAuth>
                <Home boxes={boxes} scans={scans}/>
              </RequireAuth>
            } />
            <Route path='/boxes' element={
              <RequireAuth>
                <Boxes boxes={boxes} scans={scans}/>
              </RequireAuth>
            } />
            <Route path='/scans' element={
              <RequireAuth>
                <Scans boxes={boxes} scans={scans}/>
              </RequireAuth>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
