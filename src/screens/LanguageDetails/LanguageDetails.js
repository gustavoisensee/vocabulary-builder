import React from 'react';
import { View } from 'react-native';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import { getData, storeData } from '../../helpers/asyncStorage';
import { updateLanguages } from '../../helpers/observers';
import { BUTTON } from '../../consts/colors';

const LanguageDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const handleRemove = async() => {
    try {
      const list = await getData('languages');
      const filteredList = list.filter(l => l.id !== item.id)
      
      await storeData('languages', filteredList);
      
      updateLanguages();
      navigation.goBack();
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text bold>Title</Text>
      <Text>{item.title}</Text>

      <View style={{ flexDirection: 'row' }}>
        <Button onPress={navigation.goBack}>
          <Text bold>Go back</Text>
        </Button>
        <Button onPress={handleRemove} style={{ backgroundColor: BUTTON.secondary }}>
          <Text bold style={{ color: 'white' }}>Remove</Text>
        </Button>
      </View>
    </View>
  );
};

export default LanguageDetails;
