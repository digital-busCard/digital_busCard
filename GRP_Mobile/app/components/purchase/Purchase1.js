import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Button, Icon, Image, Text, View} from 'react-native-ui-lib';
import bus from '../../../assets/bus.json';
import reginaLogo from '../../../assets/regina_logo.png';
import {Colors} from '../../constant/Colors';
import {TutorialStyles} from '../../constant/CommonStyle';

const Purchase1 = ({navigation}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [topicButton, setTopicButton] = useState(TutorialStyles.headButton);
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    console.log('History ' + JSON.stringify(navigation.getState().index));
    if (navigation.getState().index != 0) {
      setIsFirst(false);
    }
    if (!isCollapsed) {
      setTopicButton(TutorialStyles.expandedButton);
    } else {
      setTopicButton(TutorialStyles.headButton);
    }
  }, [isCollapsed]);
  return (
    <View style={TutorialStyles.container}>
      <View style={TutorialStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} disabled={isFirst}>
          <View style={TutorialStyles.backContainer}>
            <Icon
              source={require('../../../assets/back.webp')}
              size={40}
              tintColor={isFirst ? Colors.primary : Colors.white}
            />
          </View>
        </TouchableOpacity>

        <View style={TutorialStyles.titleContainer}>
          <Text style={TutorialStyles.title}>Are you ready?</Text>
        </View>
      </View>
      <View style={TutorialStyles.grid}>
        <View style={TutorialStyles.backContainer}></View>
        <View style={TutorialStyles.purchaseContainer}>
          <Text style={TutorialStyles.question}>
            Would you like to buy a card?
          </Text>
          <Text style={TutorialStyles.subQuestion}>(Recommended)</Text>
        </View>
      </View>
      <View style={TutorialStyles.loop}>
        <Image
          style={TutorialStyles.primaryMedia}
          source={reginaLogo}
          resizeMode="contain"
        />
        <LottieView
          style={TutorialStyles.maxWidth}
          source={bus}
          autoPlay={true}
          loop
        />
      </View>
      <View style={TutorialStyles.footer}>
        <Button
          onPress={() => setIsCollapsed(!isCollapsed)}
          label="I want to buy a card"
          style={topicButton}
          backgroundColor={Colors.primary}
        />
        <Collapsible style={TutorialStyles.collapsed} collapsed={isCollapsed}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Recommend')}
            style={TutorialStyles.listButton}>
            <View>
              <Text style={{textAlign: 'center'}}>
                I would like some help to choose a card
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SelectCard', {
                acceptedCriteria: [],
              })
            }
            style={TutorialStyles.listButton}>
            <View>
              <Text style={{textAlign: 'center'}}>
                I want to pick a card myself
              </Text>
            </View>
          </TouchableOpacity>
        </Collapsible>
        <View style={TutorialStyles.inferiorContainer}>
          <Text style={TutorialStyles.inferiorText}>Maybe later</Text>
        </View>
      </View>
    </View>
  );
};

export default Purchase1;
