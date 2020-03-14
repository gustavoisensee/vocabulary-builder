import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LanguageItem = ({ id, title }) => {
  const navigation = useNavigation();
  const handleRedirect = () => {
    navigation.navigate('LanguageDetails', { item: { id, title } });
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
      minHeight: 60
    }}>
      <TouchableOpacity onPress={handleRedirect}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageItem;