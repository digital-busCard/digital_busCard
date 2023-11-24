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
import {PermissionsAndroid} from 'react-native';
import { Client } from '@stomp/stompjs';
import { Colors } from './constant/Colors';


// Uses the Apple code to pick up iPhones
const APPLE_ID = 0x4c;
const MANUF_DATA = [1, 0];
const SCAN_MANUF_DATA = Platform.OS === 'android' ? null : MANUF_DATA;


BLEAdvertiser.setCompanyId(APPLE_ID);

export async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Regina Transit Kiosk',
          message: 'In order for the app to work properly, please turn on bluetooth',
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
        'The App requires bluetooth to be enabled',
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
      passengerLogged: []
    };
  }

onBTSStatusChange = () => {
  return
}

connect = () => {
  console.log("connecting.")
  if (!this.stompClient || !this.stompClient.connected) {
    console.log("connecting.")
    this.stompClient = new Client({
      brokerURL: 'https://grp-bus-server-dev.onrender.com/stream?token=bus1',
      onConnect: () => this.onConnected()
    })
    this.stompClient.activate();
    console.log(this.stompClient.connected)
  }
}

onConnected = () => {
  console.log("onConnected");
  console.log("ws stat: " + this.stompClient.connected)
  this.stompClient.subscribe("/user/topic/passengers", (messeage) => {
    console.log("in subscribe")
    console.log("message received: " + messeage.body)
    this.addPassengerLogged(JSON.parse(messeage.body))
  });
  console.log("after stat: " + this.stompClient.connected)
}

  addPassengerLogged(passengerInformation) {
    const queuedPassenger = this.state.passengerLogged.find((passenger) => passenger.verification == passengerInformation.verification)
    console.log(queuedPassenger)
    if (!queuedPassenger) {
      console.log("New Queue is validated")
      let newPassenger = {
        uuid: passengerInformation.passengerId,
        verification: passengerInformation.verification,
        expireDate: passengerInformation.expireDate
      };

      this.setState({
        passengerLogged: update(this.state.passengerLogged, {
          $push: [
            newPassenger
          ],
        })
      })
    }
  }

  componentDidMount() {
    requestLocationPermission();
    this.setState({
      uuid: '7eb096d2-8268-11ee-b962-0242ac120000',
      isConnected: false
    });
    this.connect();
    this.start();
    setInterval(() => {
      this.setState({
        time : new Date().toLocaleString()
      })
    }, 1000);
  }

  start() {
    console.log("stomp connection.. " + this.stompClient)
    this.connect();
    console.log(this.state.uuid, 'Registering Listener');
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

    this.setState({
      isLogging: true,
    });
  }

  short(str) {
    return (
      ' xxx' +
      str.substring(str.length - 4, str.length)
    ).toUpperCase();
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>BUS 1 Kiosk</Text>
            <Text style={styles.sectionTitle}>Welcome!</Text>
          </View>
          <Text style={styles.bold}>{this.state.time}</Text>
          <View style={styles.sectionContainerFlex}>
            <Text style={styles.sectionTitle}>Authenticated Passenger</Text>
            <FlatList
              data={this.state.passengerLogged.sort((a, b) => { 
                return (parseInt(b.verification) - parseInt(a.verification))
              })}
              renderItem={({item}) => (
                <View style={styles.passenger}>
                <View style={styles.containerVerification}>
                  <Text style={styles.textVerification}>N{item.verification}</Text>
                </View>
                <View style={styles.details}>
                  <View style={styles.containerId}>
                    <Text style={styles.textId}>{this.short(item.uuid)}</Text>
                  </View>
                  <View style={styles.containerExpireDate}>
                    <Text style={styles.textExpireDate}>expire: {item.expireDate}</Text>
                  </View>
                </View>
              </View>
              )}
              keyExtractor={(item) => item.verification}
            />
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
  bold: {textAlign: 'center', fontSize: 20, fontWeight: 'bold'},
  passenger: {fontSize: 30, height: 100, borderRadius: 30, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 20},
  containerVerification: {flex: 1, height: '100%', justifyContent: 'center', alignContent: 'center', textAlign: 'center', backgroundColor: Colors.primary, borderTopLeftRadius: 30, borderBottomLeftRadius: 30},
  textVerification: {textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white'},
  details: {flexDirection: 'column', paddingVertical: 20, flex: 2, height: '100%', justifyContent: 'center', borderColor: Colors.primary, borderTopWidth: 2, borderBottomWidth: 2, borderRightWidth: 2, borderTopRightRadius: 30, borderBottomRightRadius: 30},
  containerId: {flex: 1, height: '100%', marginRight: 10, justifyContent: 'center'},
  textId: {textAlign: 'center', fontSize: 20},
  containerExpireDate: {flex: 1, height: '100%', justifyContent: 'center', alignContent: 'center', textAlign: 'center'},
  textExpireDate: {textAlign: 'center', fontSize: 15}
});

export default Entry;
