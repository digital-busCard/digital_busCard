import React, { useState, useEffect } from 'react'
import {View, Text, Button} from 'react-native-ui-lib';
import LottieView from "lottie-react-native";
import bluetooth from "../../../assets/bluetooth.json"
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';
import { Icon } from 'react-native-ui-lib';
import { TouchableOpacity, Alert } from 'react-native';
import { checkPermission } from '../../external/bluetooth';
import { NativeEventEmitter, NativeModules } from 'react-native';


const Tutorial1 = ({navigation}) => {
  const [bluetoothActive, setBluetoothActive] = useState(false);
  const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);

  onBTStatusChange = eventEmitter.addListener('onBTStatusChange', (enabled) => {
    setBluetoothActive(enabled.enabled)
  });

  useEffect(() => {
    const checkBluetoothStatus = async() => {
      bluetoothStatus = await checkPermission();
      setBluetoothActive(bluetoothStatus);
    };
    checkBluetoothStatus();
  },[])

  return (
    <View style={TutorialStyles.container}>
       <View style={TutorialStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={TutorialStyles.backContainer}><Icon source={require('../../../assets/back.webp')} size={40} tintColor={Colors.primary}/></View>
        </TouchableOpacity>
        <View style={TutorialStyles.titleContainer}><Text style={TutorialStyles.title}>Let's get Started!</Text></View>
      </View>
      <View style={TutorialStyles.suggestionContainer}>
        <Text style={TutorialStyles.page}>1 / 4</Text>
        <Text style={TutorialStyles.suggestion}>To use the app to verify yourself</Text>
        <Text style={TutorialStyles.suggestion}>Please allow us to use your bluetooth</Text>
      </View>
      <View style={TutorialStyles.loop}>
      <LottieView style={TutorialStyles.lottie} source={bluetooth} autoPlay={true} loop/>
      </View>
      <View style={TutorialStyles.footer}>
        {bluetoothActive ? 
        <Button style={TutorialStyles.primaryButton} label="Next" labelStyle={TutorialStyles.primaryLabel} backgroundColor={Colors.primary} disabled={!bluetoothActive} onPress={() => navigation.navigate('Tutorial2')}/>
        :
        <Button style={TutorialStyles.primaryButton} label="Please turn on Bluetooth" labelStyle={TutorialStyles.primaryLabel} backgroundColor={Colors.primary} disabled={!bluetoothActive} onPress={() => navigation.navigate('Tutorial2')}/>
        }
      </View>
    </View>
  )
}

export default Tutorial1