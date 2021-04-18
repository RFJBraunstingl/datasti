/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/AppNavigator';
import {Provider} from 'react-redux';
import Store from './src/shared/stores';

const App = () => {
  return (
    <Provider store={Store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
