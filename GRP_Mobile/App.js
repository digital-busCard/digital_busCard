/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Entry from './app/Entry';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from './app/components/Onboarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tutorial1 from './app/components/tutorial/Tutorial-1';
import Tutorial2 from './app/components/tutorial/Tutorial-2';
import Tutorial3 from './app/components/tutorial/Tutorial-3';
import Tutorial4 from './app/components/tutorial/Tutorial-4';
import Purchase1 from './app/components/purchase/Purchase1';
import {NativeEventEmitter, NativeModules} from 'react-native'
import Recommend from './app/components/purchase/Recommend';
import SelectCard from './app/components/purchase/SelectCard';
import CardDetail from './app/components/purchase/CardDetail';

const Stack = createNativeStackNavigator();

const App: () => React$Node = () => {
  const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);
onBTStatusChange = eventEmitter.addListener('onBTStatusChange', (enabled) => {
  return
});
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}} />
        <Stack.Screen name="Tutorial1" component={Tutorial1} options={{headerShown: false}}/>
        <Stack.Screen name="Tutorial2" component={Tutorial2} options={{headerShown: false}}/>
        <Stack.Screen name="Tutorial3" component={Tutorial3} options={{headerShown: false}}/>
        <Stack.Screen name="Tutorial4" component={Tutorial4} options={{headerShown: false}}/>
        <Stack.Screen name="Purchase1" component={Purchase1} options={{headerShown: false}}/>
        <Stack.Screen name="Recommend" component={Recommend} options={{headerShown: false}}/>
        <Stack.Screen name="SelectCard" component={SelectCard} options={{headerShown: false}}/>
        <Stack.Screen name="CardDetail" component={CardDetail} options={{headerShown: false}}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};



export default App;
