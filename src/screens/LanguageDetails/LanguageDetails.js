import shortid from 'shortid';
import React, { useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Modal from '../../components/molecules/Modal';
import WordCreate from '../../components/organisms/WordCreate';
import { getData, storeData } from '../../helpers/asyncStorage';
import { updateLanguages } from '../../helpers/observers';
import { BUTTON } from '../../consts/colors';
import WordItem from '../../components/molecules/WordItem';
import Wrapper from '../../components/atoms/Wrapper';

const LanguageDetails = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
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

  const [title, onChangeTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const handleAddWord = async() => {
    try {
      if (!title.replace(/ /g, '')) {
        setTitleError(true);
        return;
      }
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
          const sortedWords = words.sort((a, b) => a.title.localeCompare(b.title));

          c.words = sortedWords
          setItem({ ...item, words: sortedWords });
          if (titleError) setTitleError(false)

          return;
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

  const handleDeleteWord = async(word) => {
    try {
      const list = await getData('languages');
      
      list.some(c => {
        if (c.id === item.id) {
          const filteredWords = c.words.filter(w => w.id !== word.id);

          c.words = filteredWords
          setItem({ ...item, words: filteredWords });

          return;
        }
      })

      await storeData('languages', list);
      updateLanguages();

    } catch (err) {
      console.warn(err)
      Alert.alert('Error');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Wrapper>
        <Text bold>Language</Text>
        <Text paddingBottom>{item.title}</Text>

        <Text bold>Number of words</Text>
        <Text paddingBottom>{item.words ? item.words.length : 0}</Text>

        <Button onPress={() => setShowModal(true)} style={{ marginVertical: 0 }}>
          <Text bold> Add new word </Text>
        </Button>
      </Wrapper>
    
      <View style={{ flex: 1, marginLeft: 16 }}>
        <SwipeListView
          data={item.words}
          renderItem={(data) => (
            <WordItem {...data.item} />
          )}
          renderHiddenItem={(data) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start', 
                  justifyContent: 'center',
                  paddingLeft: 2
                }}
              >
                <Button onPress={() => handleDeleteWord(data.item)} style={{
                  backgroundColor: BUTTON.secondary
                }}>
                  <Text bold style={{ color: 'white' }}> - </Text>
                </Button>
              </View>
            )
          }}
          style={{ paddingRight: 16, paddingBottom: 16 }}
          leftOpenValue={60}
        />
      </View>
    
      <Wrapper>
        <Button onPress={handleRemoveConfirmation} style={{
          backgroundColor: BUTTON.secondary,
          marginBottom: 0
        }}>
          <Text bold style={{ color: 'white' }}>Delete language</Text>
        </Button>
      </Wrapper>

      <Modal show={showModal} closeModal={setShowModal}>
        <WordCreate item={item} setItem={setItem} closeModal={setShowModal} />
      </Modal>
    </View>
  );
};

export default LanguageDetails;
