import React, { useState } from 'react';
import { Alert, View, TouchableHighlight } from 'react-native';
import Input from '../../components/atoms/Input';
import Text from '../../components/atoms/Text';
import { storeData, getData } from '../../helpers/asyncStorage';
import Button from '../../components/atoms/Button';

const LanguageCreate = ({ closeModal }) => {
  const [title, onChangeTitle] = useState();
  const saveLanguage = async() => {
    try {
      const list = await getData('languages');
      const convertedList = list ? JSON.parse(list) : [];

      if (convertedList.some(c => c.title.toLowerCase() === title.toLowerCase())) {
        return Alert.alert('This language already exist!');
      }

      convertedList.push({ title });

      await storeData('languages', JSON.stringify(convertedList));

      closeModal(false)

    } catch (err) {
      Alert.alert('Error');
    }
  };

  return (
    <View>
      <Text bold>Title</Text>
      <Input value={title} onChange={onChangeTitle} />

      <Button onPress={saveLanguage}>
        <Text bold>Save</Text>
      </Button>
    </View>
  );
};

export default LanguageCreate;