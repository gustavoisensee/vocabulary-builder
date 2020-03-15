import shortid from 'shortid';
import React, { useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import { getData, storeData } from '../../helpers/asyncStorage';
import { updateLanguages } from '../../helpers/observers';
import { BUTTON } from '../../consts/colors';
import WordItem from '../../components/molecules/WordItem';

const LanguageDetails = ({ navigation, route }) => {
  const [item, setItem] = useState(route.params.item);
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
  const handleRemoveConfirmation = () => {
    Alert.alert(
      'Delete language',
      'Are your sure you want to delete this language?',
      [
        { text: 'No' },
        { text: 'Yes', onPress: handleRemove },
      ]
    )
  }

  const [title, onChangeTitle] = useState();
  const handleAddWord = async() => {
    try {
      const list = await getData('languages');
      
      list.some(c => {
        if (c.id === item.id) {
          
          if (c.words.some(w => w.title.toLowerCase() === title.toLowerCase())) {
            Alert.alert('This word already exist!');
            return;
          }

          const words = [
            { id: shortid.generate(), title },
            ...c.words
          ];
          const sortedWords = words.sort((a,b) => a.title.localeCompare(b.title));

          c.words = sortedWords
          setItem({ ...item, words: sortedWords });
        }

        return;
      })

      await storeData('languages', list);

      onChangeTitle('');
      updateLanguages();

    } catch (err) {
      console.warn(err)
      Alert.alert('Error');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text bold>Language</Text>
      <Text paddingBottom>{item.title}</Text>

      <Text bold>Add your new word here</Text>
      <View style={{ flexDirection: 'row' }}>
        <Input value={title} onChange={onChangeTitle} placeholder='Word' style={{ flex: 1, marginRight: 8 }} />
        <Button onPress={handleAddWord}>
          <Text bold> + </Text>
        </Button>
      </View>

      <ScrollView alwaysBounceHorizontal={false} style={{ marginRight: -8, paddingRight: 8 }}>
        {item.words && item.words.map((word, i) => (
          <WordItem key={i} {...word} />
        ))}
      </ScrollView>

      <Button onPress={handleRemoveConfirmation} style={{ backgroundColor: BUTTON.secondary }}>
        <Text bold style={{ color: 'white' }}>Delete language</Text>
      </Button>
    </View>
  );
};

export default LanguageDetails;
