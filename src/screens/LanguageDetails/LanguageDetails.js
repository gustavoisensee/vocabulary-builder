import React, { useState } from 'react';
import { Alert, View, Image } from 'react-native';
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
  const [search, setSearch] = useState();
  const [word, setWord] = useState();
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState(route.params.item);
  const [words, setWords] = useState(item.words);
  
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
  };

  const handleRemoveConfirmation = () => {
    Alert.alert(
      'Delete language',
      'Are your sure you want to delete this language?',
      [
        { text: 'No' },
        { text: 'Yes', onPress: handleRemove },
      ]
    )
  };

  const handleEditWord = (word) => {
    setWord(word);
    setShowModal(true);
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

  const handleSearch = (value) => {
    const reg = RegExp(value.toLowerCase());
    const list = [...item.words];
    const filteredList = value ? list
      .filter(l => reg.test(l.title.toLowerCase()))
      : list;
    
    setSearch(value);
    setWords(filteredList);
  };

  const handleNewWord = () => {
    setWord({});
    setShowModal(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Wrapper>
        <Text bold style={{ paddingBottom: 4 }}>Language</Text>
        <Text paddingBottom>{item.title}</Text>

        <Text bold style={{ paddingBottom: 4 }}>Number of words</Text>
        <Text paddingBottom={false}>{item.words ? item.words.length : 0}</Text>

        <Input
          value={search} onChange={handleSearch}
          placeholder='Search' style={{ marginBottom: 0 }}
        />
      </Wrapper>
    
      <View style={{ flex: 1, marginLeft: 16, marginTop: 0 }}>
        <SwipeListView
          data={words}
          renderItem={(data) => (
            <WordItem {...data.item} />
          )}
          renderHiddenItem={(data) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start', 
                  flexDirection: 'row',
                  paddingLeft: 2
                }}
              >
                <Button onPress={() => handleDeleteWord(data.item)} style={{
                  backgroundColor: BUTTON.secondary,
                  padding: 11,
                  marginRight: 4
                }}>
                  <Image
                    source={require('../../../assets/delete.png')}
                    fadeDuration={0}
                    style={{ width: 20, height: 20 }}
                  />
                </Button>
                <Button onPress={() => handleEditWord(data.item)} style={{
                  backgroundColor: BUTTON.tertiary,
                  padding: 11
                }}>
                  <Image
                    source={require('../../../assets/edit.png')}
                    fadeDuration={0}
                    style={{ width: 20, height: 20 }}
                  />
                </Button>
              </View>
            )
          }}
          style={{ paddingRight: 16, paddingBottom: 16 }}
          leftOpenValue={100}
        />
      </View>
    
      <Wrapper style={{ flexDirection: 'row' }}>
        <Button onPress={handleRemoveConfirmation} style={{
          backgroundColor: BUTTON.secondary,
          marginBottom: 0,
          marginTop: 0,
          flex: 1,
          marginRight: 8
        }}>
          <Text bold style={{ color: 'white' }}>Delete language</Text>
        </Button>
        <Button onPress={handleNewWord} style={{
          marginVertical: 0,
          flex: 1,
          marginLeft: 8
        }}>
          <Text bold>Add new word</Text>
        </Button>
      </Wrapper>

      <Modal show={showModal} closeModal={setShowModal} title='Word'>
        <WordCreate
          item={item}
          setWords={setWords}
          closeModal={setShowModal}
          word={word}
        />
      </Modal>
    </View>
  );
};

export default LanguageDetails;
