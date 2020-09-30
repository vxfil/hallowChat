import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { AppNavigation } from './src/navigation/AppNavigation';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { bootstrap } from './src/bootstrap';
import store from './src/store/index';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
