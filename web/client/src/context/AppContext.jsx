import React, { createContext, useEffect, useState } from 'react';
import { createTheme } from '../theme/index';
import { getBoxesByAdminId, getScansByBoxes, getCountryName } from '../service';

const AppContext = createContext({
  boxes: [],
  scans: [],
  navOpen: false,
  setNavOpen: () => {},
  fetchBoxes: () => {},
  fetchScans: () => {},
  isMobile: false,
  user: null
});

export const AppProvider = ({ theme, useMediaQuery, children }) => {
	const [boxes, setBoxes] = useState([]);
  const [scans, setScans] = useState([]);
  const isMobile = !useMediaQuery(theme.breakpoints.up('lg'));
  const [navOpen, setNavOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBoxes = async () => {
    try {
      const boxesResponse = await getBoxesByAdminId(user.id);
      boxesResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBoxes(boxesResponse.data);
      return boxesResponse.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status >= 400)
        setBoxes(null);
    }
  }

  const fetchScans = async (boxes) => {
    if (!boxes) return;
    try {
      setScans([]);
      const boxIds = boxes.map(box => box.id);
      const scansResponse = await getScansByBoxes(boxIds);
      const scans = scansResponse.data;

      const updatedScans = [];
      for (const scan of scans) {
        const { latitude, longitude } = scan.location.coords;
        const name = await getCountryName({latitude, longitude});
        const updatedScan = { ...scan, countryName: name['country'] };
        updatedScans.push(updatedScan);
      }
      updatedScans.sort((a, b) => new Date(b.time) - new Date(a.time));
      setScans(updatedScans);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status >= 400)
        setScans(null);
    }
  }

  useEffect(() => {
    setNavOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    fetchBoxes()
      .then((res) => fetchScans(res));
  }, []);

  return (
    <AppContext.Provider
      value={{
        boxes,
        scans,
        navOpen,
        setNavOpen,
        fetchBoxes,
        fetchScans,
        isMobile,
        user
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
