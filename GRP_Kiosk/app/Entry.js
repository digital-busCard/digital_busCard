import React, {Component, useEffect} from 'react';

import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';

import {NativeEventEmitter, NativeModules} from 'react-native';

import update from 'immutability-helper';
import BLEAdvertiser from 'react-native-ble-advertiser';
import UUIDGenerator from 'react-native-uuid-generator';
import {PermissionsAndroid} from 'react-native';
import { useQuery } from '@realm/react';
import { Passenger, getPassenger } from './components/Passenger';
import { submitAlert } from './components/Alert';
import { useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


// Uses the Apple code to pick up iPhones
const APPLE_ID = 0x4c;
const MANUF_DATA = [1, 0];
// No scanner filters (finds all devices inc iPhone). Use UUID suffix to filter scans if using.
const SCAN_MANUF_DATA = Platform.OS === 'android' ? null : MANUF_DATA;


BLEAdvertiser.setCompanyId(APPLE_ID);

export async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'BLE Avertiser Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('[Permissions]', 'Location Permission granted');
      } else {
        console.log('[Permissions]', 'Location Permission denied');
      }
    }

    const blueoothActive = await BLEAdvertiser.getAdapterState()
      .then((result) => {
        console.log('[Bluetooth]', 'Bluetooth Status', result);
        return result === 'STATE_ON';
      })
      .catch((error) => {
        console.log('[Bluetooth]', 'Bluetooth Not Enabled');
        return false;
      });

    if (!blueoothActive) {
      await Alert.alert(
        'Example requires bluetooth to be enabled',
        'Would you like to enable Bluetooth?',
        [
          {
            text: 'Yes',
            onPress: () => BLEAdvertiser.enableAdapter(),
          },
          {
            text: 'No',
            onPress: () => console.log('Do Not Enable Bluetooth Pressed'),
            style: 'cancel',
          },
        ],
      );
    }
  } catch (err) {
    console.warn(err);
  }
}

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '7eb096d2-8268-11ee-b962-0242ac120000',
      isLogging: false,
      devicesFound: [],
      isConnected: false
    };
  }

 
stompClient;


connect = () => {
  console.log("connecting.")
  if (!this.state.isConnected) {
    console.log("connecting.")
    this.stompClient = new Client({
      brokerURL: 'https://grp-bus-server-dev.onrender.com/stream?token=kiosk1',
      onConnect: () => this.onConnected(),
    })
    this.stompClient.activate();
    console.log("check stat " + this.stompClient.status)
  }
}

onConnected = () => {
  console.log("onConnected");
  this.state.isConnected = true
  console.log("check stat " + this.stompClient.status)
  // Subscribe to the Public Topic
  this.stompClient.subscribe("user/topic/passengers", (messeage) => {console.log("message " + messeage)});
}

authenticate(event) {
  console.log("in authenticate " + event.uuid)
  console.log(this.state.isConnected)
  if (this.state.isConnected) {
    console.log("is connect")
    // if (!this.isTimedOut(event)) {
    //   console.log("timeout" + event.uuid)
    //   return
    // }
    console.log("not timedout")
    authenticatedEvent = this.validate(event)
    this.timeOut(authenticatedEvent)
    this.alert(authenticatedEvent)
  }
}


isTimedOut(event) {
  if (event.expire != null && event.expire > new Date()) {
    return true
  }
}

validate(event) {
  console.log("validate..")
  passengers = getPassenger();
  passengers.forEach((passenger) => {
    console.log(passenger)
    console.log(passenger.uuid.toUpperCase() + "=" + event.uuid.toUpperCase())
    if (passenger.uuid.toUpperCase() === event.uuid.toUpperCase()) {
      console.log("return "+passenger.uuid)
      this.validatedPassenger = passenger;
    }
  })
  return this.validatedPassenger;
}

alert(event) {
  const toSubmit = {
    passengerId: [event.uuid],
    bus: "10"
  }
  console.log("constructing payload " + toSubmit.passengerId.toString())
  submitAlert(this.stompClient, toSubmit)
}

timeOut(event) {
  console.log("timeout")
  console.log(event)
  const expire = new Date();
  console.log(expire)
  expire.setMinutes(expire.getMinutes() + 30);
  const index = this.state.devicesFound.findIndex(({uuid}) => uuid.toUpperCase() === event.uuid.toUpperCase());
  console.log(this.state.devicesFound)
  console.log("changing value " + index)
  console.log(expire)
  this.setState({
    devicesFound: update(this.state.devicesFound, {
      [index]: {
        expire: {$set: expire}
      },
    }),
  });
  console.log(this.state.devicesFound[index]);
}

  addDevice(_uuid, _name, _mac, _rssi, _date) {
    const index = this.state.devicesFound.findIndex(({uuid}) => uuid === _uuid);
    if (index < 0) {
      let newDev = {
        uuid: _uuid,
        name: _name,
        mac: _mac,
        rssi: _rssi,
        start: _date,
        end: _date,
        expire: null,
      };

      this.setState({
        devicesFound: update(this.state.devicesFound, {
          $push: [
            newDev
          ],
        }),
      });
      console.log("authenticate");
      this.authenticate(newDev);
    } else {
      this.setState({
        devicesFound: update(this.state.devicesFound, {
          [index]: {
            end: {$set: _date},
            rssi: {$set: _rssi || this.state.devicesFound[index].rssi},
          },
        }),
      });
    }
  }

  componentDidMount() {
    requestLocationPermission();
    UUIDGenerator.getRandomUUID((newUid) => {
      this.setState({
        uuid: '7eb096d2-8268-11ee-b962-0242ac120000',
        isConnected: false
      });
    });
  }

  componentWillUnmount() {
    if (this.state.isLogging) {
      this.stop();
    }
  }

  start() {
    console.log("stomp connection.. " + this.stompClient)
    this.connect();
    console.log(this.state.uuid, 'Registering Listener');
    const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);

    this.onDeviceFound = eventEmitter.addListener('onDeviceFound', (event) => {
      if (event.serviceUuids) {
        for (let i = 0; i < event.serviceUuids.length; i++) {
          if (event.serviceUuids[i] && event.serviceUuids[i].endsWith('00')) {
            this.addDevice(
              event.serviceUuids[i],
              event.deviceName,
              event.deviceAddress,
              event.rssi,
              new Date(),
            );
          }
        }
      }
    });

    console.log(this.state.uuid, 'Starting Advertising');
    BLEAdvertiser.broadcast('7eb096d2-8268-11ee-b962-0242ac120000', MANUF_DATA, {
      advertiseMode: BLEAdvertiser.ADVERTISE_MODE_BALANCED,
      txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_LOW,
      connectable: false,
      includeDeviceName: false,
      includeTxPowerLevel: false,
    })
      .then((sucess) => console.log('7eb096d2-8268-11ee-b962-0242ac120000', 'Adv Successful', sucess))
      .catch((error) => console.log('7eb096d2-8268-11ee-b962-0242ac120000', 'Adv Error', error));

    console.log(this.state.uuid, 'Starting Scanner');
    BLEAdvertiser.scan(SCAN_MANUF_DATA, {
      scanMode: BLEAdvertiser.SCAN_MODE_LOW_LATENCY,
    })
      .then((sucess) => console.log(this.state.uuid, 'Scan Successful', sucess))
      .catch((error) => console.log(this.state.uuid, 'Scan Error', error));

    this.setState({
      isLogging: true,
    });
  }

  stop() {
    console.log(this.state.uuid, 'Removing Listener');
    this.onDeviceFound.remove();
    delete this.onDeviceFound;

    console.log(this.state.uuid, 'Stopping Broadcast');
    BLEAdvertiser.stopBroadcast()
      .then((sucess) => console.log(this.state.uuid, 'Stop Broadcast Successful', sucess))
      .catch((error) => console.log(this.state.uuid, 'Stop Broadcast Error', error));

    console.log(this.state.uuid, 'Stopping Scanning');
    BLEAdvertiser.stopScan()
      .then((sucess) => console.log(this.state.uuid, 'Stop Scan Successful', sucess))
      .catch((error) => console.log(this.state.uuid, 'Stop Scan Error', error));

    this.setState({
      isLogging: false,
    });
    this.connect();
  }

  short(str) {
    return (
      str.substring(0, 4) +
      ' ... ' +
      str.substring(str.length - 4, str.length)
    ).toUpperCase();
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>GRP BUS Receveiver</Text>
            <Text style={styles.sectionDescription}>
              Broadcasting:{' '}
              <Text style={styles.highlight}>
                {this.short(this.state.uuid)}
              </Text>
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            {this.state.isLogging ? (
              <TouchableOpacity
                onPress={() => this.stop()}
                style={styles.stopLoggingButtonTouchable}>
                <Text style={styles.stopLoggingButtonText}>Stop</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.start()}
                style={styles.startLoggingButtonTouchable}>
                <Text style={styles.startLoggingButtonText}>Start</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.sectionContainerFlex}>
            <Text style={styles.sectionTitle}>Devices Around</Text>
            <FlatList
              data={this.state.devicesFound}
              renderItem={({item}) => (
                <Text style={styles.itemPastConnections}>
                  {(item.uuid)} {item.mac} {item.rssi}
                </Text>
              )}
              keyExtractor={(item) => item.uuid}
            />
          </View>

          <View style={styles.sectionContainerFlex}>
            <Text style={styles.sectionTitle}>Devices Authenticated Around</Text>
            <FlatList
              data={this.state.devicesFound}
              renderItem={({item}) => (
                item.expire != null ?
                <Text style={styles.itemPastConnections}>
                  {(item.uuid)} {item.mac} {item.rssi}
                </Text>
                : null
              )}
              keyExtractor={(item) => item.uuid}
            />
          </View>

          <View style={styles.sectionContainer}>
            <TouchableOpacity
              onPress={() => this.setState({devicesFound: []})}
              style={styles.startLoggingButtonTouchable}>
              <Text style={styles.startLoggingButtonText}>Clear Devices</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
  },
  sectionContainerFlex: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    flex: 0,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  startLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#665eff',
    height: 52,
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
  },
  startLoggingButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  stopLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#fd4a4a',
    height: 52,
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
  },
  stopLoggingButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  listPastConnections: {
    width: '80%',
    height: 200,
  },
  itemPastConnections: {
    padding: 3,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default Entry;
