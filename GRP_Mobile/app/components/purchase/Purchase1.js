import React, { useState, useEffect } from 'react'
import {View, Text, Image, Button} from 'react-native-ui-lib';
import LottieView from "lottie-react-native";
import bluetooth from "../../../assets/bluetooth.json"
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';
import bus from "../../../assets/bus.json"
import reginaLogo from "../../../assets/regina_logo.png"
import { Icon } from 'react-native-ui-lib';
import { TouchableOpacity, Alert } from 'react-native';
import { checkPermission } from '../../external/bluetooth';
import { NativeEventEmitter, NativeModules } from 'react-native';
import Collapsible from 'react-native-collapsible';


const Purchase1 = ({navigation}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [topicButton, setTopicButton] = useState(TutorialStyles.headButton);
  useEffect(() => {
    if (!isCollapsed) {
        setTopicButton(TutorialStyles.expandedButton)
    } else {
        setTopicButton(TutorialStyles.headButton)
    }
  }, [isCollapsed])
  return (
    <View style={TutorialStyles.container}>
      <View style={TutorialStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={TutorialStyles.backContainer}><Icon source={require('../../../assets/back.webp')} size={40} tintColor={Colors.primary}/></View>
        </TouchableOpacity>
        <View style={TutorialStyles.titleContainer}><Text style={TutorialStyles.title}>Are you ready?</Text></View>
      </View>
      <View style={TutorialStyles.grid}>
      <View style={TutorialStyles.backContainer}></View>
      <View style={TutorialStyles.purchaseContainer}>
        <Text style={TutorialStyles.suggestion}>Would you like to buy a card?</Text>
        <Text style={TutorialStyles.suggestion}>(Recommended)</Text>
      </View>
      </View>
      <View style={TutorialStyles.loop}>
      <Image style={TutorialStyles.primaryMedia} source={reginaLogo} resizeMode="contain"/>
        <LottieView style={TutorialStyles.maxWidth} source={bus} autoPlay={true} loop/>
      </View>
      <View style={TutorialStyles.footer}>
        <Button onPress={() => setIsCollapsed(!isCollapsed)} label="I want to buy a card" style={topicButton} backgroundColor={Colors.primary}/>
        <Collapsible style={TutorialStyles.collapsed} collapsed={isCollapsed}>
            <View style={TutorialStyles.listButton}><Text>I would like some help to choose a card</Text></View>
            <View style={TutorialStyles.listButton}><Text>I want to pick a card myself</Text></View>
        </Collapsible>
        <View style={TutorialStyles.inferiorContainer}><Text style={TutorialStyles.inferiorText}>Maybe later</Text></View>
      </View>
 </View>
  )
}

export default Purchase1