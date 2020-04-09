import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../../atoms/Text';

const LanguageItem = (props) => {
  const navigation = useNavigation();
  const handleRedirect = () => {
    navigation.navigate('LanguageDetails', { item: { ...props } });
  }

  return (
    <View style={{
      justifyContent: 'center',
      backgroundColor: 'white',
      marginTop: 16,
      padding: 16,
      border: 1,
      borderRadius: 3,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      minHeight: 60,
    }}>
      <TouchableOpacity onPress={handleRedirect} style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text>{props.title}</Text>
        <Text bold>{`${props?.words?.length || 0} words`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageItem;