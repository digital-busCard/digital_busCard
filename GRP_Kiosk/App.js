/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Entry from './app/Entry';
import {createRealmContext} from '@realm/react';
import * as encoding from 'fast-text-encoding'

const App: () => React$Node = () => {
  return (
      <Entry></Entry>
  );
};



export default App;
