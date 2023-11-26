import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SelectDropdown from 'react-native-select-dropdown';
import {
  Icon,
  Image,
  Text,
  View
} from 'react-native-ui-lib';
import busIcon from '../../../assets/busIcon.png'
import reginaSmallLogo from '../../../assets/regina_small_logo.png'
import suggested from '../../../assets/suggested.png';
import { Colors } from '../../constant/Colors';
import { TutorialStyles } from '../../constant/CommonStyle';
import { cardFilter } from '../../constant/Filter';
import { getRecommendedCard } from '../../service/RecommendationService';

const SelectCard = ({route, navigation}) => {
  const [card, setCard] = useState()
  const [filteredCard, setFilteredCard] = useState(card);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function call() {
      cardList = await getRecommendedCard();
      setCard(cardList);
      setFilteredCard(cardList);
      setIsLoaded(true);
    }
    call();
  }, [])

  return (
    <AnimatedSplash
        logoWidth={150}
        logoHeight={150}
        translucent={true}
        isLoaded={isLoaded}
        logoImage={reginaSmallLogo}
        disableBackgroundImage
      >
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
          <Text style={TutorialStyles.title}>Select a Card</Text>
        </View>
      </View>
      <View style={TutorialStyles.legendContainer}>
        <Image
          source={suggested}
          style={{paddingBottom: 20, width: 20, height: 20}}
        />
        <View>
          <Text style={{color: Colors.white, fontWeight: 'bold', paddingLeft: 10}}>Recommended</Text>
        </View>
      </View>
      <View style={TutorialStyles.legendContainer}>
        <Text style={{color: Colors.white, fontWeight: 'bold', paddingLeft: 10}}>
          Valid Period:{' '}
        </Text>
        <SelectDropdown
          renderDropdownIcon={() => (
            <Icon
              source={require('../../../assets/back.webp')}
              size={30}
              tintColor={Colors.primary}
              style={{transform: [{rotate: '90deg'}]}}
            />
          )}
          buttonStyle={{
            margin: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.primary,
          }}
          defaultButtonText="Valid Period"
          data={cardFilter}
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            if (selectedItem === 'All') {
              console.log(selectedItem);
              setFilteredCard(card);
              return;
            }
            const filteredCard = card.filter((item) => {
              return item.valid == selectedItem;
            });
            setFilteredCard(filteredCard);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem + ' Days';
          }}
          rowTextForSelection={(item, index) => {
            return item + ' Days';
          }}
        />
      </View>
      <View style={TutorialStyles.list}>
        <FlatList
          data={filteredCard}
          renderItem={(item) => (
            <TouchableOpacity onPress={() =>
             navigation.navigate('CardDetail', {
              itemId: item.item.cardTypeId,
              item: item.item
             })
            }>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  height: 100,
                  borderColor: Colors.white,
                  borderBottomWidth: 2,
                }}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  {item.item.isRecommended ? (
                    <View
                      style={{
                        position: 'absolute',
                        left: 5,
                        width: 20,
                        height: 20,
                        borderRadius: 50,
                        borderWidth: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                      }}>
                      <Image
                        source={suggested}
                        style={{width: 20, height: 20}}
                      />
                    </View>
                  ) : null}
                  <View
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: Colors.white,
                      backgroundColor: Colors.white,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={busIcon}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View
                  style={{flex: 3, flexDirection: 'column', paddingTop: 25}}>
                  <Text style={{color: Colors.white, fontWeight: 'bold'}}>{item.item.cardName}</Text>
                  <View style={{flex: 1, flexDirection: 'row', paddingTop: 3}}>
                    <Text style={{color: Colors.white}}>{item.item.cardType} </Text>
                    <Text style={{color: Colors.white, paddingLeft: 2}}>{item.item.valid} Days</Text>
                  </View>
                </View>
                <View style={{flex: 1.5, justifyContent: 'center'}}>
                  <Text style={{color: Colors.white, fontWeight: 'bold', textAlign: 'center', paddingRight: 20}}>
                    $CAD
                  </Text>
                  <Text style={{color: Colors.white, fontWeight: 'bold', textAlign: 'center', paddingRight: 20}}>
                    {item.item.price}
                  </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: Colors.white, alignItems: 'center'}}>
                  <Icon
                    source={require('../../../assets/back.webp')}
                    size={40}
                    tintColor={Colors.primary}
                    style={{transform: [{rotateY: '180deg'}]}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={TutorialStyles.maxWidth}></View>
    </View>
    </AnimatedSplash>
  );
};

export default SelectCard;
