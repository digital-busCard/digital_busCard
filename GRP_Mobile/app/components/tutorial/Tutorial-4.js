import React from 'react'
import {View, Text, Button, Image} from 'react-native-ui-lib';
import bus from "../../../assets/bus.json"
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native';

const Tutorial4 = ({navigation}) => {
  return (
    <View style={TutorialStyles.container}>
       <View style={TutorialStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={TutorialStyles.backContainer}><Icon source={require('../../../assets/back.webp')} size={40} tintColor={Colors.primary}/></View>
        </TouchableOpacity>
        <View style={TutorialStyles.titleContainer}><Text style={TutorialStyles.title}>Almost Done!</Text></View>
      </View>
      <View style={TutorialStyles.suggestionContainer}>
        <Text style={TutorialStyles.page}>4 / 4</Text>
        <Text style={TutorialStyles.suggestion}>When the bus arrive, enter the bus</Text>
        <Text style={TutorialStyles.suggestion}>Click confirm & Enjoy the ride!</Text>

      </View>
      <View style={TutorialStyles.loop}>
        <LottieView style={TutorialStyles.maxWidth} source={bus} autoPlay={true} loop/>
      </View>
      <View style={TutorialStyles.footer}>
        <Button style={TutorialStyles.primaryButton} label="Done" labelStyle={TutorialStyles.primaryLabel} backgroundColor={Colors.primary} onPress={() => navigation.navigate('Purchase1')}/>
      </View>
    </View>
  )
}

export default Tutorial4