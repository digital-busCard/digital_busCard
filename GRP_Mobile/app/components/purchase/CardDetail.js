import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import Loader from 'react-native-modal-loader';
import {
  Icon,
  Text,
  View
} from 'react-native-ui-lib';
import reginaSmallLogo from '../../../assets/regina_small_logo.png'
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';
import { getRecommendedCard } from '../../service/RecommendationService';
import { addTicket, getTicket } from '../../external/internalTicket';

const CardDetail = ({route, navigation}) => {
  const { itemId, item, givenValid } = route.params;
  const [validFrom, setValidFrom] = useState(givenValid ? givenValid : getDateToday())
  const [validTo, setValidTo] = useState(validFrom ? calculateValidTo() : getDateToday());
  const [intention, setIntention] = useState(true);
  function getDateToday() {
    return new Date();
  }

  function calculateValidTo() {
    const validTo = new Date(validFrom)
    validTo.setDate(validFrom.getDate() + item.valid)
    return validTo
  }

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function call() {
      cardList = await getRecommendedCard();
      setIsLoaded(true);
    }
    call();
  }, [])

  async function call() {
    owned = await getTicket();
    if (owned) {
      Alert.alert("You already owned a ticket!", "Do you want to replace it?", [
        
          {
            text: 'Cancel',
            onPress: () => setIntention(false),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ])
    }
    if (!intention) {
      setIsLoaded(false);
      ticketId = await getRecommendedCard();
      await addTicket(ticketId)
      setIsLoaded(true);
    }
  }

  return (
      <AnimatedSplash
        logoWidth={150}
        logoHeight={150}
        translucent={true}
        isLoaded={isLoaded}
        logoImage={reginaSmallLogo}
        disableBackgroundImage
    >
    <Loader loading={!isLoaded} color={Colors.primary} />
    <View style={TutorialStyles.container}>
      <View style={TutorialStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={TutorialStyles.backContainer}>
            <Icon
              source={require('../../../assets/back.webp')}
              size={40}
              tintColor={Colors.white}
            />
          </View>
        </TouchableOpacity>
        <View style={TutorialStyles.titleContainer}>
          <Text style={TutorialStyles.title}>{item.cardName}</Text>
        </View>
      </View>
      <View style={TutorialStyles.list}>
        <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{borderRadius: 30, backgroundColor: Colors.white, padding: 10}}>
              <Text style={{textAlign: 'center', fontSize: 10}}>Valid from: </Text>
              <Text style={{textAlign: 'center', fontSize: 16}}>{validFrom.getDate() + " " + validFrom.toLocaleString('default', { month: 'short' }) + " " + validFrom.getFullYear()}</Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', marginLeft: 20}}>
            <View style={{borderRadius: 30, backgroundColor: Colors.white, padding: 10}}>
              <Text style={{textAlign: 'center',  fontSize: 10}}>Valid to: </Text>
              <Text style={{textAlign: 'center', fontSize: 16}}>{validTo.getDate() + " " + validTo.toLocaleString('default', { month: 'short' }) + " " + validTo.getFullYear()}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 2, margin: 20, padding: 20, borderRadius: 20, backgroundColor: Colors.white}}>
          <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Special Requirements</Text>
          <View>
            <FlatList 
             data={item.cardDescription}
             renderItem={(item) => (
              <Text style={{paddingTop: 20}}>- {item.item}</Text>
              )}
             />
             {!item.cardDescription[0] ? <Text style={{paddingTop: 20}}>N/A</Text>: null}
          </View>
        </View>
        <View style={{marginTop: 'auto', backgroundColor: Colors.white, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 20}}>
            <Text style={{fontSize: 10, textAlign: 'center'}}>Price</Text>
            <Text style={{backgroundColor: Colors.white, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>$CAD {item.price}</Text>
          </View>
      </View >
      <View style={{flex: 3}}></View>
      <TouchableOpacity onPress={() => call()} style={{width: '100%', alignItems: 'center'}}>
        <View style={{marginTop: 'auto', borderWidth: 2, backgroundColor: Colors.green, borderColor: Colors.green,  fontSize: 20, borderRadius: 20, padding: 15, margin: 10, width: '90%'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>BUY</Text>
        </View>
      </TouchableOpacity>
      <View style={TutorialStyles.maxWidth}></View>
    </View>
    </AnimatedSplash>
  );
};

export default CardDetail;
