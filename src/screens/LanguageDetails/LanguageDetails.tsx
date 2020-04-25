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
import { captureException, DEFAULT_ERROR_MESSAGE } from '../../helpers/sentry';
import wType from '../../types/word';
import lType from '../../types/language';
import styles from './styles';

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

  const getSections = () => {
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
      captureException(err, 'Error on LanguageDetails/handleRemove');
      Alert.alert(DEFAULT_ERROR_MESSAGE);
    }
  };

  const handleRemoveConfirmation = () => {
    Alert.alert(
      'Delete language',
      'Are your sure you want to delete this language?',
      [{ text: 'No' }, { text: 'Yes', onPress: handleRemove }]
    );
  };

  const handleEditWord = (row: wType) => {
    setWord(row);
    setShowModal(true);
  };

  const handleDeleteWord = async (row: wType) => {
    try {
      const list: Array<lType> = await retrieveData('languages');

      list.some((c) => {
        if (c.id === item.id) {
          const filteredWords = c.words.filter((w) => w.id !== row.id);

          c.words = filteredWords;
          setWords(filteredWords);
        }
      });

      LayoutAnimation.configureNext(animationSpring);
      await storeData('languages', list);
      updateLanguages();
    } catch (err) {
      captureException(err, 'Error on LanguageDetails/handleDeleteWord');
      Alert.alert(DEFAULT_ERROR_MESSAGE);
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
    <View style={styles.containerHiddenItem}>
      <Button
        onPress={() => handleDeleteWord(data.item)}
        style={styles.buttonDeleteWord}
      >
        <DeleteIcon color={COLORS.white} size={20} />
      </Button>
      <Button
        onPress={() => handleEditWord(data.item)}
        style={styles.buttonEditWord}
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
  }, [item]);

  const sections = getSections();

  return (
    <View style={styles.container}>
      <Wrapper style={styles.headerContainer}>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Text bold style={styles.headerText}>
              Language
            </Text>
            <Text paddingBottom>{item.title}</Text>
          </View>
          <View style={styles.flex}>
            <Text bold style={styles.headerText}>
              Number of words
            </Text>
            <Text paddingBottom={false}>{words ? words.length : 0}</Text>
          </View>
        </View>
        <Input
          value={search}
          onChange={handleSearch}
          placeholder='Search'
          style={styles.searchInput}
        />
      </Wrapper>

      {words.length ? (
        <SafeAreaView style={styles.flex}>
          <SectionList
            sections={sections}
            keyExtractor={({}, index) => `word-section-${index}`}
            renderItem={({ item: wordItem }) => {
              return (
                <View style={styles.wordContainer}>
                  <SwipeListView
                    data={[wordItem]}
                    keyExtractor={({}, index) => `word-section-row-${index}`}
                    renderItem={(data) => <WordItem {...data.item} />}
                    renderHiddenItem={renderHiddenItem}
                    style={styles.swipeContainer}
                    leftOpenValue={100}
                  />
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeaderContainer}>
                <Text bold style={styles.sectionHeaderTitle}>
                  {title}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      ) : (
        <Empty title='You have no words added so far.' />
      )}

      <Wrapper style={styles.row}>
        <Button
          onPress={handleRemoveConfirmation}
          style={styles.buttonDeleteLanguage}
        >
          <Text bold style={styles.buttonDeleteTitle} fontSize={16}>
            Delete language
          </Text>
        </Button>
        <Button onPress={handleNewWord} style={styles.buttonNewWord}>
          <Text bold fontSize={16}>
            Add new word
          </Text>
        </Button>
      </Wrapper>

      <Modal show={showModal} closeModal={setShowModal} title='Word'>
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
