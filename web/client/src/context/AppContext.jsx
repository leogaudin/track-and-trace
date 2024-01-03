import React, { createContext, useEffect, useState } from 'react';
import { getBoxesByAdminId } from '../service';
import { useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';
import { theme } from '../App';

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
  loading: true,
});

export const AppProvider = ({ children }) => {
  const [boxes, setBoxes] = useState(null);
  const [scans, setScans] = useState(null);
  const isMobile = !useMediaQuery(theme.breakpoints.up('lg'));
  const [navOpen, setNavOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  const fetchBoxes = async () => {
    if (user) {
      try {
        setBoxes(null);
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
    setScans(null);
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
      .then((res) => fetchScans(res))
      .then(() => setLoading(false))
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
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
