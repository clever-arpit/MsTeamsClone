import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/redux';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/hooks/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={styles.root}>
          <RootNavigator />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
