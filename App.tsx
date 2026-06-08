import React from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/redux';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/hooks/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
