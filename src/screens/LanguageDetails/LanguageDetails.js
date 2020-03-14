import shortid from 'shortid';
import React, { useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import { getData, storeData } from '../../helpers/asyncStorage';
import { updateLanguages } from '../../helpers/observers';
import { BUTTON } from '../../consts/colors';

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

  const [title, onChangeTitle] = useState();
  const handleAddWord = async() => {
    try {
      const list = await getData('languages');
      
      list.forEach(c => {
        if (c.id === item.id) {
          const word = { id: shortid.generate(), title }
          c.words.push(word);
          // TODO recheck/improve this logic
          setItem({ ...item, words: [word, ...item.words] });
        }
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

      <Text bold>Word</Text>
      <Input value={title} onChange={onChangeTitle} Word />
      <Button onPress={handleAddWord}>
        <Text bold>Add word</Text>
      </Button>

      <ScrollView>
        {item.words.map((l, i) => (
          <Text key={i}>{l.title}</Text>
        ))}
      </ScrollView>

      <Button onPress={handleRemove} style={{ backgroundColor: BUTTON.secondary }}>
        <Text bold style={{ color: 'white' }}>Delete language</Text>
      </Button>
    </View>
  );
};

export default LanguageDetails;
