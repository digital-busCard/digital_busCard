
import BLEAdvertiser from 'react-native-ble-advertiser';
import { Alert } from 'react-native';

export async function checkPermission() {
    try {
      const blueoothActive = await BLEAdvertiser.getAdapterState()
        .then((result) => {
          return result === 'STATE_ON';
        })
        .catch((error) => {
          return false;
        });
      
      return blueoothActive;
    } catch (err) {
      console.warn(err);
    }
  }