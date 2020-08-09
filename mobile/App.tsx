import React from 'react';

import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';

import {
  useFonts,
  Archivo_700Bold,
  Archivo_400Regular,
} from '@expo-google-fonts/archivo';

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Archivo_700Bold,
    Archivo_400Regular,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <AppStack />
      <StatusBar style="light" />
    </>
  );
};

export default App;
