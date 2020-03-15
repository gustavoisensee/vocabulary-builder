import shortid from 'shortid';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { storeData, getData } from '../../../helpers/asyncStorage';
import { updateLanguages } from '../../../helpers/observers';

const WordCreate = ({ item, setItem, closeModal, word = {} }) => {
  const [title, onChangeTitle] = useState(word.title || '');
  const [titleError, setTitleError] = useState(false);
  const [translation, onChangeTranslation] = useState(word.translation || '');

  const saveWord = async() => {
    try {
      if (!title.replace(/ /g, '')) {
        setTitleError(true);
        return;
      }
      const list = await getData('languages');
      
      const valid = list.some(c => {
        if (c.id === item.id) {
          if (c.words.some(w => w.title.toLowerCase() === title.toLowerCase() && word && word.id !== w.id)) {
            Alert.alert('This word already exist!');
            return false;
          }

          const words = [
            {
              id: shortid.generate(),
              title,
              translation
            },
            ...c.words
          ];
          const sortedWords = words.sort((a, b) => a.title.localeCompare(b.title));
          const filteredWords = word && word.id ? sortedWords.filter(w => w.id !== word.id) : sortedWords;

          c.words = filteredWords
          setItem({ ...item, words: filteredWords });
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

      <Text bold>Translation</Text>
      <Input
        value={translation}
        onChange={onChangeTranslation}
        placeholder='Translation'
      />

      <Button onPress={saveWord}>
        <Text bold>Save</Text>
      </Button>
    </View>
  );
};

export default WordCreate;