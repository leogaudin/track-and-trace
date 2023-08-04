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
      setBoxes([]);
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
    setScans([]);
    const reducer = boxes.reduce((accumulator, box) => {
      if (box.scans && Array.isArray(box.scans))
        return accumulator.concat(box.scans);
      return accumulator;
    }, []);

    setScans(reducer?.length > 0 ? reducer : null);
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
