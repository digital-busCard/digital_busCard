import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Icon, Text, View } from 'react-native-ui-lib';
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';
import { getStatus } from '../../service/RecommendationService';
import Status from '../Status';


const Recommend = ({navigation}) => {
  const statusList = getStatus();
  const [appliedStatusList, setAppliedStatusList] = useState([]);

  function toggle(status) {
    let configuringList = appliedStatusList;
    const item = appliedStatusList.findIndex((appliedStatus) => appliedStatus == status)
    if (item >= 0) {
      configuringList.splice(item, 1)
      setAppliedStatusList(configuringList)
    } else {
      setAppliedStatusList([...appliedStatusList, status])
    }
  }
  return (
    <View style={TutorialStyles.container}>
      <View style={TutorialStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={TutorialStyles.backContainer}><Icon source={require('../../../assets/back.webp')} size={40} tintColor={Colors.white}/></View>
        </TouchableOpacity>
        <View style={TutorialStyles.titleContainer}>
          <Text style={TutorialStyles.title}>Are you any of the following?</Text>
        </View>
      </View>
      <View style={TutorialStyles.grid}>
        <View style={TutorialStyles.purchaseContainer}>
          <Text style={TutorialStyles.question}>Please select your conditions that apply to you so we can recommend a suitable fare type</Text>
        </View>
      </View>
      <View style={TutorialStyles.answer}>
        <View>
          {statusList.map((item, id) => {
            return <Status label={item.label} toggle={() => toggle(item.value)} key={id}/>
          })}
        </View>
      </View>
      <View style={TutorialStyles.footer}>
      <Button style={TutorialStyles.primaryButton} label="Next" labelStyle={TutorialStyles.primaryLabel} backgroundColor={Colors.primary} onPress={() => navigation.navigate('SelectCard')}/>
      </View>
 </View>
  )
}

export default Recommend