import shortid from 'shortid'; // tslint:disable-line
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, View } from 'react-native';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { storeData, retrieveData } from '../../../helpers/asyncStorage';
import { updateLanguages } from '../../../helpers/observers';
import lType from '../../../types/language';

interface lcType {
  closeModal(a: boolean): void;
  item: any;
}

const LanguageCreate = ({ closeModal, item }: lcType) => {
  const { id, title: itemTitle, words } = item || {};
  const [title, onChangeTitle] = useState(itemTitle);
  const [titleError, setTitleError] = useState(false);
  const saveLanguage = async () => {
    try {
      if (!title.replace(/ /g, '')) {
        setTitleError(true);
        return;
      }
      const list: Array<lType> = await retrieveData('languages');
      let newList: Array<lType> = [];
      let valid: boolean;

      if (id) {
        valid = list.some((listItem) => {
          if (
            listItem.title.toLowerCase() === title.toLowerCase() &&
            listItem.id !== id
          ) {
            Alert.alert('This language already exist!');
            return false;
          }

          const filteredLanguages = list.filter((w) => w.id !== id);
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
      console.warn(err);
      Alert.alert('Error');
    }
  };

  return (
    <View>
      <Text bold>Title</Text>
      <Input
        error={!title && titleError}
        // TOOD check if item existe and grab item.title
        value={title}
        onChange={onChangeTitle}
        placeholder="Language"
      />

      <Button onPress={saveLanguage}>
        <Text bold>Save</Text>
      </Button>
    </View>
  );
};

LanguageCreate.propTypes = {
  closeModal: PropTypes.func,
  item: PropTypes.object
};

export default LanguageCreate;
