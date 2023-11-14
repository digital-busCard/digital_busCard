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
import { Passenger } from './app/components/Passenger';
import axios from 'axios';
import * as encoding from 'fast-text-encoding'

const realmConfig = {
  schema: [Passenger],
};
export const realm = new Realm({schema: [Passenger]});

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

  const addStandard = () => {
    console.log("adding Standard")
    realm.write(() => {
      realm.deleteAll('Passenger')
      realm.create('Passenger', {
        uuid: '7eb096d2-8268-11ee-b962-0242ac120000',
        expireDate: new Date(),
        _id: new Realm.BSON.ObjectId(),
      });
      console.log(realm.objects("Passenger"))
    });
  };  
  addStandard();

const App: () => React$Node = () => {
  return (
    <RealmProvider>
      <Entry></Entry>
    </RealmProvider>
  );
};



export default App;
