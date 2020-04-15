import shortid from 'shortid'; // tslint:disable-line
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { storeData, retrieveData } from '../../../helpers/asyncStorage';
import { updateLanguages } from '../../../helpers/observers';
import { alphabet } from '../../../consts/alphabet';
import wType from '../../../types/word';
import lType from '../../../types/language';

interface wcType {
  item: any;
  setItem(a?: any): void;
  word: wType;
  setWords(a?: any): void;
  closeModal(a?: any): void;
}

const WordCreate = ({ item, setItem, word, setWords, closeModal }: wcType) => {
  const [title, onChangeTitle] = useState(word.title || '');
  const [titleError, setTitleError] = useState(false);
  const [translation, onChangeTranslation] = useState(word.translation || '');
  const [description, onChangeDescription] = useState(word.description || '');

  const saveWord = async () => {
    try {
      if (!title.replace(/ /g, '')) {
        setTitleError(true);
        return;
      }
      const validWord = alphabet.some(
        (a) => a === title.charAt(0).toUpperCase()
      );
      if (!validWord) {
        Alert.alert('The word should start with an alphabetic letter.');
        return;
      }

      const list: Array<lType> = await retrieveData('languages');

      const valid = list.some((listItem) => {
        if (listItem.id === item.id) {
          if (
            listItem.words &&
            listItem.words.some(
              (w) =>
                w?.title?.toLowerCase() === title.toLowerCase() &&
                word.id !== w.id
            )
          ) {
            Alert.alert('This word already exist!');
            return false;
          }

          const filteredWords =
            word && word.id
              ? listItem.words.filter((w) => w.id !== word.id)
              : listItem.words;
          const words = [
            {
              id: word.id || shortid.generate(),
              title,
              translation,
              description
            },
            ...(filteredWords || [])
          ];
          const sortedWords = words.sort((a, b) => {
            const aWord: string = a?.title || '';
            const bWord: string = b?.title || '';
            return aWord.localeCompare(bWord);
          });

          listItem.words = sortedWords;
          setWords(sortedWords);
          setItem(listItem);
          if (titleError) setTitleError(false);

          return true;
        }
      });

      if (valid) {
        await storeData('languages', list);

        updateLanguages();
        closeModal(false);
      }
    } catch (err) {
      console.warn(err);
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
        placeholder="Word"
      />

      <Text bold>Translation</Text>
      <Input
        value={translation}
        onChange={onChangeTranslation}
        placeholder="Translation"
      />

      <Text bold>Description</Text>
      <Input
        value={description}
        onChange={onChangeDescription}
        placeholder="Description"
        multiline
        numberOfLines={4}
        style={{ height: 100 }}
      />

      <Button onPress={saveWord}>
        <Text bold>Save</Text>
      </Button>
    </View>
  );
};

WordCreate.propTypes = {
  item: PropTypes.object,
  setItem: PropTypes.func,
  word: PropTypes.object,
  setWords: PropTypes.func,
  closeModal: PropTypes.func
};

export default WordCreate;
