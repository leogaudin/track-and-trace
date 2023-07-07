import React from 'react';
import Scanner from './src/components/views/Scanner';
import Login from './src/components/views/Login';
import AskPermissions from './src/components/views/AskPermissions';
import { AppProvider } from './src/context/AppContext';
import { PaperProvider } from 'react-native-paper';
import theme from './src/styles/theme';

export default function App() {
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <Login />
        <Scanner />
        <AskPermissions />
      </PaperProvider>
    </AppProvider>
  );
}
