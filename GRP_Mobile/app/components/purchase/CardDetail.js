import React, {useEffect, useState} from 'react';
import {Alert, FlatList, TouchableOpacity} from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import Loader from 'react-native-modal-loader';
import {Icon, Text, View} from 'react-native-ui-lib';
import reginaSmallLogo from '../../../assets/regina_small_logo.png';
import {Colors} from '../../constant/Colors';
import {TutorialStyles} from '../../constant/CommonStyle';
import { purchase } from '../../service/PurchaseService';
import {addTicket, getTicket} from '../../external/internalTicket';

const CardDetail = ({route, navigation}) => {
  const {item, givenValid} = route.params;
  const [validFrom, setValidFrom] = useState(
    givenValid ? givenValid : getDateToday(),
  );
  const [validTo, setValidTo] = useState(
    validFrom ? calculateValidTo() : getDateToday(),
  );
  const [intention, setIntention] = useState(true);
  function getDateToday() {
    return new Date();
  }

  function calculateValidTo() {
    const validTo = new Date(validFrom);
    validTo.setDate(validFrom.getDate() + parseInt(item.valid));
    return validTo;
  }

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('Card Detail' + JSON.stringify(item));
    setIsLoaded(true);
    setIntention(true)
    console.log(intention);
  }, []);

  async function preProcessTicket() {
    owned = await getTicket();
    console.log(owned);
    if (owned) {
      Alert.alert('You already owned a ticket!', 'Do you want to replace it?', [
        {
          text: 'Cancel',
          onPress: () => undefined,
          style: 'cancel',
        },
        {text: 'Continue', onPress: () => buy()},
      ]);
    } else {
      Alert.alert("Are you sure?", 'You are purchasing a fare card ' + item.cardName + ' for $CAD' + item.price, [
        {
          text: 'Cancel',
          onPress: () => undefined,
          style: 'cancel',
        },
        {text: 'Confirm', onPress: () => buy()},
      ]);
    }

  }

  async function buy() {
      setIsLoaded(false);
      ticketId = await purchase(item.cardTypeId, validFrom.getDate() + "/" + validFrom.getMonth() + "/" + validFrom.getFullYear());
      if (ticketId) {
        await addTicket(ticketId.passengerId);
        setIsLoaded(true);
        Alert.alert("Nicely Done!", 'You have purchased a fare card type ' + item.cardName + ' for $CAD' + item.price);
      } else {
        setIsLoaded(true);
        Alert.alert("We are sorry!", 'We have encountered issues, please try agin later or contact +1 (xxx) xxx-xxxx for help');
      }
  }

  return (
    <AnimatedSplash
      logoWidth={150}
      logoHeight={150}
      backgroundColor={Colors.line}
      isLoaded={isLoaded}
      logoImage={reginaSmallLogo}>
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
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: Colors.white,
                  padding: 10,
                  shadowColor: Colors.shadow,
                  shadowOffset: {
                    width: 5,
                    height: 14,
                  },
                  shadowOpacity: 0.43,
                  shadowRadius: 5.51,
                }}>
                <Text style={{textAlign: 'center', fontSize: 10}}>
                  Valid from:{' '}
                </Text>
                <Text style={{textAlign: 'center', fontSize: 16}}>
                  {validFrom.getDate() +
                    ' ' +
                    validFrom.toLocaleString('default', {month: 'short'}) +
                    ' ' +
                    validFrom.getFullYear()}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginLeft: 20,
                shadowColor: Colors.shadow,
                shadowOffset: {
                  width: 5,
                  height: 14,
                },
                shadowOpacity: 0.43,
                shadowRadius: 5.51,
              }}>
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: Colors.white,
                  padding: 10,
                }}>
                <Text style={{textAlign: 'center', fontSize: 10}}>
                  Valid to:{' '}
                </Text>
                <Text style={{textAlign: 'center', fontSize: 16}}>
                  {validTo.getDate() +
                    ' ' +
                    validTo.toLocaleString('default', {month: 'short'}) +
                    ' ' +
                    validTo.getFullYear()}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              margin: 20,
              padding: 20,
              borderRadius: 20,
              backgroundColor: Colors.white,
              shadowColor: Colors.shadow,
              shadowOffset: {
                width: 5,
                height: 14,
              },
              shadowOpacity: 0.43,
              shadowRadius: 5.51,
            }}>
            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
              Special Requirements
            </Text>
            <View>
              <FlatList
                data={item.cardTypeDescription}
                renderItem={(item) => (
                  <Text style={{paddingTop: 20}}>
                    - {item.item.description != "None" ? "You must be " + item.item.description : item.item.description}
                  </Text>
                )}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 'auto',
              backgroundColor: Colors.white,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              padding: 20,
            }}>
            <Text style={{fontSize: 10, textAlign: 'center'}}>Price</Text>
            <Text
              style={{
                backgroundColor: Colors.white,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              $CAD {item.price}.00
            </Text>
          </View>
        </View>
        <View style={{flex: 3}}></View>
        <TouchableOpacity
          onPress={() => preProcessTicket()}
          style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              marginTop: 'auto',
              borderWidth: 2,
              backgroundColor: Colors.green,
              borderColor: Colors.green,
              fontSize: 20,
              borderRadius: 20,
              padding: 15,
              margin: 10,
              width: '90%',
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 5,
                height: 14,
              },
              shadowOpacity: 0.43,
              shadowRadius: 9.51,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              BUY
            </Text>
          </View>
        </TouchableOpacity>
        <View style={TutorialStyles.maxWidth}></View>
      </View>
    </AnimatedSplash>
  );
};

export default CardDetail;
