import React from 'react'
import { Image } from "react-native";
import {View, Text, Button} from 'react-native-ui-lib';
import LottieView from "lottie-react-native";
import bus from "../../assets/bus.json"
import reginaLogo from "../../assets/regina_logo.png"
import { Colors } from '../constant/Colors';
import { CommonStyles } from '../constant/CommonStyle';

const Onboarding = ({navigation}) => {
  return (
    <View style={CommonStyles.container}>
       <View style={CommonStyles.header}>
        <Text style={CommonStyles.title}>Welcome to</Text>
        <Text style={CommonStyles.title}>Regina Transit!</Text>
        <View style={CommonStyles.suggestionContainer}>
        <Text style={CommonStyles.suggestion}>We can help you travel easier</Text>
        <Text style={CommonStyles.suggestion}>& Say Goodbye to your ticket!</Text>
        </View>
      </View>
      <Image style={CommonStyles.primaryMedia} source={reginaLogo} resizeMode="contain"/>
      <LottieView style={CommonStyles.lottie} source={bus} autoPlay={true} loop/>
      <View style={CommonStyles.footer}>
        <Button style={CommonStyles.primaryButton} label="Next" labelStyle={CommonStyles.primaryLabel} backgroundColor={Colors.primary}
        onPress={() => navigation.navigate("Tutorial1")}/>
      </View>
    </View>
  )
}

export default Onboarding