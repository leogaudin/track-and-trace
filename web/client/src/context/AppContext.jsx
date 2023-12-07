import React, { createContext, useEffect, useState } from 'react';
import { createTheme } from '../theme/index';
import { getBoxesByAdminId, getScansByBoxes, getCountryName } from '../service';
import { toast } from 'react-toastify';

const AppContext = createContext({
  boxes: [],
  scans: [],
  navOpen: false,
  setNavOpen: () => {},
  fetchBoxes: () => {},
  fetchScans: () => {},
  isMobile: false,
  user: null,
  language: 'en',
  setLanguage: () => {},
});

export const AppProvider = ({ theme, useMediaQuery, children }) => {
  const [boxes, setBoxes] = useState([]);
  const [scans, setScans] = useState([]);
  const isMobile = !useMediaQuery(theme.breakpoints.up('lg'));
  const [navOpen, setNavOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [language, setLanguage] = useState('en');

  const fetchBoxes = async () => {
    if (user) {
      try {
        setBoxes([]);
        let hasMore = true;
        const limit = 2100;
        const requests = [];

        while (hasMore) {
          const skip = requests.length * limit;
          const request = getBoxesByAdminId(user.id, skip, limit);
          requests.push(request);
          const response = await request;
          if (response.data.length < limit) hasMore = false;
        }

        const responses = await Promise.all(requests);
        const mergedBoxes = responses.reduce((accumulator, response) => {
          return accumulator.concat(response.data);
        }, []);

        mergedBoxes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBoxes(mergedBoxes);
        return mergedBoxes;
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
        if (err.response && err.response.status >= 400) {
          setBoxes(null);
        }
      }
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
        user,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
