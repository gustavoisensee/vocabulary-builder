// @ts-ignore
import shortid from 'shortid';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, View } from 'react-native';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { storeData, retrieveData } from '../../../helpers/asyncStorage';
import { updateLanguages } from '../../../helpers/observers';
import {
  captureException,
  DEFAULT_ERROR_MESSAGE
} from '../../../helpers/sentry';
import lType from '../../../types/language';

interface lcType {
  closeModal(a: boolean): void;
  item: any;
}

const LanguageCreate = ({ closeModal, item = {} }: lcType) => {
  const [language, setLanguage] = useState(item);
  const [titleError, setTitleError] = useState(false);

  const saveLanguage = async () => {
    try {
      const { id, title, words } = language;
      if (!title.replace(/ /g, '')) {
        setTitleError(true);
        return;
      }
      const list: Array<lType> = await retrieveData('languages');
      let newList: Array<lType> = [];
      let valid: boolean;

      if (id) {
        valid = list.some((listItem: lType) => {
          if (
            listItem.title.toLowerCase() === title.toLowerCase() &&
            listItem.id !== id
          ) {
            Alert.alert('This language already exist!');
            return false;
          }

          const filteredLanguages = list.filter((w: lType) => w.id !== id);
          const languages = [{ id, title, words }, ...filteredLanguages];

          newList = languages;
          return true;
        });
      } else {
        const languages = [
          { id: shortid.generate(), title, words: [] },
          ...(list || [])
        ];

        newList = languages;
        valid = true;
      }

      if (titleError) setTitleError(false);
      if (valid) {
        const sortedWords = newList.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        await storeData('languages', sortedWords);

        updateLanguages();
        closeModal(false);
      }
    } catch (err) {
      captureException(err, 'Error on LanguageCreate/saveLanguage');
      Alert.alert(DEFAULT_ERROR_MESSAGE);
    }
  };

  const handleTitleChange = (value: string) => {
    setLanguage({ ...language, title: value });
  };

  useEffect(() => {
    if (item) setLanguage(item);
  }, [item]);

  return (
    <View>
      <Text bold>Title</Text>
      <Input
        error={!language.title && titleError}
        value={language.title}
        onChange={handleTitleChange}
        placeholder='Language'
      />

      <Button onPress={saveLanguage}>
        <Text bold fontSize={16}>
          Save
        </Text>
      </Button>
    </View>
  );
};

LanguageCreate.propTypes = {
  closeModal: PropTypes.func,
  item: PropTypes.object
};

export default LanguageCreate;
