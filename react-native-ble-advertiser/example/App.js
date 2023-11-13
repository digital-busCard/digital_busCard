/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Entry from './app/Entry';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import axios from 'axios';


export class Passenger extends Realm.Object {
  static schema = {
    name: 'Passenger',
    properties: {
      uuid: {type: 'string', indexed: true},
      expireDate: 'date',
    },
  };
}

const realmConfig = {
  schema: [Passenger],
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

const App: () => React$Node = () => {
  return (
    <RealmProvider>
      <Entry></Entry>
    </RealmProvider>
  );
};



export default App;
