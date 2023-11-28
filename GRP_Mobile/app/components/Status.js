import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-ui-lib';
import { Colors } from '../constant/Colors';

const Status = ({label, toggle}) => {
    const [isToggle, setIsToggle] = useState(false);
  return (
    <View  style={{marginVertical: 10}}>
     <Checkbox 
     style={{width: 30, height: 30}}
     labelStyle={{fontSize: 16}}
     label={label} value={isToggle} onValueChange={() => {
        setIsToggle(!isToggle)
        toggle()
    }}
    color={Colors.primary}
    />
    </View>
  )
}

export default Status