import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  SafeAreaView,
  SectionList,
  LayoutAnimation
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Modal from '../../components/molecules/Modal';
import WordCreate from '../../components/organisms/WordCreate';
import { retrieveData, storeData } from '../../helpers/asyncStorage';
import { updateLanguages, languagesSubject } from '../../helpers/observers';
import { COLORS } from '../../consts/colors';
import WordItem from '../../components/molecules/WordItem';
import Wrapper from '../../components/atoms/Wrapper';
import Empty from '../../components/atoms/Empty/Empty';
import DeleteIcon from '../../components/atoms/Icon/Delete';
import EditIcon from '../../components/atoms/Icon/Edit';
import { animationSpring } from '../../consts/animation';
import { alphabet } from '../../consts/alphabet';
import wType from '../../types/word';
import lType from '../../types/language';

interface ldType {
  navigation: any;
  route: any;
}

interface sType {
  title: string;
  data: Array<wType>;
}

const LanguageDetails = ({ navigation, route }: ldType) => {
  const [item, setItem] = useState(route.params.item);
  const [search, setSearch] = useState<string>();
  const [word, setWord] = useState<wType>();
  const [showModal, setShowModal] = useState(false);
  const [words, setWords] = useState(item.words || []);

  const getSections = (words: Array<wType>) => {
    const sections: Array<sType> = alphabet.map((a) => ({
      title: a,
      data: []
    }));
    words.forEach((w: wType) => {
      const i = sections.findIndex(
        (f: sType) => f.title === w?.title?.charAt(0).toUpperCase()
      );
      sections[i].data.push(w);
    });
    return sections.filter((s) => !!s.data.length);
  };

  const handleRemove = async () => {
    try {
      const list: Array<lType> = await retrieveData('languages');
      const filteredList = list.filter((l) => l.id !== item.id);

      await storeData('languages', filteredList);

      updateLanguages();
      navigation.goBack();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleRemoveConfirmation = () => {
    Alert.alert(
      'Delete language',
      'Are your sure you want to delete this language?',
      [{ text: 'No' }, { text: 'Yes', onPress: handleRemove }]
    );
  };

  const handleEditWord = (word: wType) => {
    setWord(word);
    setShowModal(true);
  };

  const handleDeleteWord = async (word: wType) => {
    try {
      const list: Array<lType> = await retrieveData('languages');

      list.some((c) => {
        if (c.id === item.id) {
          const filteredWords = c.words.filter((w) => w.id !== word.id);

          c.words = filteredWords;
          setWords(filteredWords);

          return;
        }
      });

      LayoutAnimation.configureNext(animationSpring);
      await storeData('languages', list);
      updateLanguages();
    } catch (err) {
      console.warn(err);
      Alert.alert('Error');
    }
  };

  const handleSearch = (value: string) => {
    const reg = RegExp(value.toLowerCase());
    const list = [...item.words];
    const filteredList = value
      ? list.filter((l) => reg.test(l.title.toLowerCase()))
      : list;

    setSearch(value);
    setWords(filteredList);
  };

  const handleNewWord = () => {
    setWord(undefined);
    setShowModal(true);
  };

  const renderHiddenItem = (data: any) => (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingLeft: 2
      }}
    >
      <Button
        onPress={() => handleDeleteWord(data.item)}
        style={{
          backgroundColor: COLORS.secondary,
          padding: 11,
          marginRight: 4
        }}
      >
        <DeleteIcon color={COLORS.white} size={20} />
      </Button>
      <Button
        onPress={() => handleEditWord(data.item)}
        style={{
          backgroundColor: COLORS.tertiary,
          padding: 11
        }}
      >
        <EditIcon color={COLORS.white} size={20} />
      </Button>
    </View>
  );

  useEffect(() => {
    const subs = languagesSubject.subscribe(async () => {
      const list: Array<lType> = await retrieveData('languages');
      if (list && item) {
        const itemRefreshed = list.find((l) => l.id === item.id);
        if (itemRefreshed) setItem(itemRefreshed);
      }
    });

    return () => {
      if (subs) subs.unsubscribe();
    };
  }, []);

  const sections = getSections(words);

  return (
    <View style={{ flex: 1 }}>
      <Wrapper style={{ paddingBottom: 0 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text bold style={{ paddingBottom: 4 }}>
              Language
            </Text>
            <Text paddingBottom>{item.title}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text bold style={{ paddingBottom: 4 }}>
              Number of words
            </Text>
            <Text paddingBottom={false}>{words ? words.length : 0}</Text>
          </View>
        </View>
        <Input
          value={search}
          onChange={handleSearch}
          placeholder="Search"
          style={{ marginVertical: 0 }}
        />
      </Wrapper>

      {words.length ? (
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => `word-section-${index}`}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    marginLeft: 16,
                    marginTop: 0
                  }}
                >
                  <SwipeListView
                    data={[item]}
                    keyExtractor={(item, index) => `word-section-row-${index}`}
                    renderItem={(data) => <WordItem {...data.item} />}
                    renderHiddenItem={renderHiddenItem}
                    style={{ paddingRight: 16 }}
                    leftOpenValue={100}
                  />
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View
                style={{
                  backgroundColor: COLORS.grey,
                  marginTop: 16,
                  paddingVertical: 16,
                  marginBottom: 0
                }}
              >
                <Text bold style={{ marginLeft: 16 }}>
                  {title}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      ) : (
        <Empty title="You have no words added so far." />
      )}

      <Wrapper style={{ flexDirection: 'row' }}>
        <Button
          onPress={handleRemoveConfirmation}
          style={{
            backgroundColor: COLORS.secondary,
            marginBottom: 0,
            marginTop: 0,
            flex: 1,
            marginRight: 8
          }}
        >
          <Text bold style={{ color: 'white' }}>
            Delete language
          </Text>
        </Button>
        <Button
          onPress={handleNewWord}
          style={{
            marginVertical: 0,
            flex: 1,
            marginLeft: 8
          }}
        >
          <Text bold>Add new word</Text>
        </Button>
      </Wrapper>

      <Modal show={showModal} closeModal={setShowModal} title="Word">
        <WordCreate
          item={item}
          setItem={setItem}
          setWords={setWords}
          closeModal={setShowModal}
          word={word}
        />
      </Modal>
    </View>
  );
};

export default LanguageDetails;