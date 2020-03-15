import shortid from 'shortid';
import React, { useState } from 'react';
import { Alert, View, TouchableHighlight } from 'react-native';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { storeData, getData } from '../../../helpers/asyncStorage';
import { updateLanguages } from '../../../helpers/observers';

const LanguageCreate = ({ closeModal }) => {
  const [title, onChangeTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const saveLanguage = async() => {
    try {
      if (!title.replace(/ /g, '')) {
        setTitleError(true);
        return;
      }
      const list = await getData('languages');
      const convertedList = list || [];

      if (convertedList.some(c => c.title.toLowerCase() === title.toLowerCase())) {
        return Alert.alert('This language already exist!');
      }

      convertedList.push({ id: shortid.generate(), title, words: [] });

      await storeData('languages', convertedList);

      updateLanguages();
      closeModal(false)

    } catch (err) {
      console.warn(err)
      Alert.alert('Error');
    }
  };

  return (
    <View>
      <Text bold>Title</Text>
      <Input
        error={!title && titleError}
        value={title}
        onChange={onChangeTitle}
        placeholder='Language'
      />

      <Button onPress={saveLanguage}>
        <Text bold>Save</Text>
      </Button>
    </View>
  );
};

export default LanguageCreate;