import React from 'react'
import {View, Text, Button, Image} from 'react-native-ui-lib';
import bluetoothInfo from "../../../assets/bluetooth-info.png"
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';
import { Icon } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native';

const Tutorial3 = ({navigation}) => {
  return (
    <View style={TutorialStyles.container}>
       <View style={TutorialStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={TutorialStyles.backContainer}><Icon source={require('../../../assets/back.webp')} size={40} tintColor={Colors.primary}/></View>
        </TouchableOpacity>
        <View style={TutorialStyles.titleContainer}><Text style={TutorialStyles.title}>Let's get Started!</Text></View>
      </View>
      <View style={TutorialStyles.suggestionContainer}>
        <Text style={TutorialStyles.page}>3 / 4</Text>
        <Text style={TutorialStyles.suggestion}>In the app,</Text>
        <Text style={TutorialStyles.suggestion}>Please ensure your bluetooth status</Text>
        <Text style={TutorialStyles.suggestion}>by checking this tab</Text>
      </View>
      <View style={TutorialStyles.loop}>
        <Image style={TutorialStyles.lottie} source={bluetoothInfo} resizeMode='contain'/>
      </View>
      <View style={TutorialStyles.footer}>
        <Button style={TutorialStyles.primaryButton} label="Next" labelStyle={TutorialStyles.primaryLabel} backgroundColor={Colors.primary} onPress={() => navigation.navigate('Tutorial4')}/>
      </View>
    </View>
  )
}

export default Tutorial3