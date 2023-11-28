import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { Button, Icon, Text, View } from 'react-native-ui-lib';
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';
import { getStatus } from '../../service/RecommendationService';
import reginaSmallLogo from '../../../assets/regina_small_logo.png'
import Status from '../Status';


const Recommend = ({navigation}) => {
  const [statusList, setStatusList] = useState([])
  const [appliedStatusList, setAppliedStatusList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    async function call() {
      questions = await getStatus();
      setStatusList(questions);
      setIsLoaded(true);
    }
    call();
  }, [])

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
    <AnimatedSplash
    logoWidth={150}
    logoHeight={150}
    backgroundColor={Colors.line}
    isLoaded={isLoaded}
    logoImage={reginaSmallLogo}
  >
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
          <Text style={TutorialStyles.question}>Please select your conditions that apply, Skip if you don't fit the criteria</Text>
        </View>
      </View>
      <View style={TutorialStyles.answer}>
        <View>
          {statusList.map((item, id) => {
            if (item.label != "None") {
              return <Status label={item.label} toggle={() => toggle(item.value)} key={id}/>
            }
          })}
        </View>
      </View>
      <View style={TutorialStyles.footer}>
      <Button style={TutorialStyles.primaryButton} label={appliedStatusList[0] ? "Next" : "Skip"} labelStyle={TutorialStyles.primaryLabel} backgroundColor={Colors.primary} onPress={() => navigation.navigate('SelectCard', {
              acceptedCriteria: appliedStatusList[0] ? appliedStatusList : ["99"]
             })}/>
      </View>
 </View>
 </AnimatedSplash>
  )
}

export default Recommend