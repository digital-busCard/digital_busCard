import LottieView from "lottie-react-native";
import React from 'react';
import { Button, Icon, Text, View } from 'react-native-ui-lib';
import payment from "../../../assets/payment.json";
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';

import { TouchableOpacity } from 'react-native';

const Tutorial2 = ({navigation}) => {
  return (
    <View style={TutorialStyles.container}>
       <View style={TutorialStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={TutorialStyles.backContainer}><Icon source={require('../../../assets/back.webp')} size={40} tintColor={Colors.white}/></View>
        </TouchableOpacity>
        <View style={TutorialStyles.titleContainer}><Text style={TutorialStyles.title}>Let's get Started!</Text></View>
      </View>
      <View style={TutorialStyles.suggestionContainer}>
        <Text style={TutorialStyles.page}>2 / 4</Text>
        <Text style={TutorialStyles.suggestion}>You are required to purchase</Text>
        <Text style={TutorialStyles.suggestion}>an online ticket with us</Text>
        <Text style={TutorialStyles.suggestion}>(Even if you already own a physical ticket)</Text>
      </View>
      <View style={TutorialStyles.loop}>
      <LottieView style={TutorialStyles.lottie} source={payment} autoPlay={true} loop/>
      </View>
      <View style={TutorialStyles.footer}>
        <Button style={TutorialStyles.primaryButton} label="Next" labelStyle={TutorialStyles.primaryLabel} backgroundColor={Colors.primary} onPress={() => navigation.navigate('Tutorial3')}/>
      </View>
    </View>
  )
}

export default Tutorial2