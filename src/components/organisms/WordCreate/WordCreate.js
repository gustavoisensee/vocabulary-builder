import shortid from 'shortid';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { storeData, getData } from '../../../helpers/asyncStorage';
import { updateLanguages } from '../../../helpers/observers';

const WordCreate = ({ item, setItem, closeModal }) => {
  const [title, onChangeTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const saveWord = async() => {
    try {
      if (!title.replace(/ /g, '')) {
        setTitleError(true);
        return;
      }
      const list = await getData('languages');
      
      const valid = list.some(c => {
        if (c.id === item.id) {
          if (c.words.some(w => w.title.toLowerCase() === title.toLowerCase())) {
            Alert.alert('This word already exist!');
            return false;
          }

          const words = [
            { id: shortid.generate(), title },
            ...c.words
          ];
          const sortedWords = words.sort((a, b) => a.title.localeCompare(b.title));

          c.words = sortedWords
          setItem({ ...item, words: sortedWords });
          if (titleError) setTitleError(false)

          return true;
        }
      })

      if (valid) {
        await storeData('languages', list);
  
        updateLanguages();
        closeModal(false);
      }
  
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
        placeholder='Word'
      />

      <Button onPress={saveWord}>
        <Text bold>Save</Text>
      </Button>
    </View>
  );
};

export default WordCreate;