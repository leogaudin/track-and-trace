import './App.css';
import React, { useState, useEffect } from 'react';
import {Card, Grid, Typography, CardActionArea, Button, CardHeader} from '@mui/material';
import { createTheme } from './theme/index';
import { ThemeProvider } from '@emotion/react';
import BoxesOverview from './components/BoxesOverview';

const theme = createTheme();

function App() {


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BoxesOverview />
      </ThemeProvider>
    </div>
  );
}

export default App;
