 import React, { useState, useEffect } from 'react';
import { Alert, View, StatusBar, ScrollView } from 'react-native';
import LanguageCreate from '../../components/organisms/LanguageCreate';
import Text from '../../components/atoms/Text';
import Modal from '../../components/molecules/Modal';
import LanguageItem from '../../components/molecules/LanguageItem';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import { retrieveData } from '../../helpers/asyncStorage';
import { languagesSubject, languageModalSubject, updateLanguageModalSubject } from '../../helpers/observers';
import Empty from '../../components/atoms/Empty/Empty';
import { saveLanguages } from '../../actions/languages';

const Language = () => {
  const [search, setSearch] = useState('');
  const [storedLanguages, setStoredLanguages] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState();

  const fetchLanguage = async() => {
    try {
      let list = await retrieveData('languages');
      const account = await retrieveData('account');

      if (account && account.user) {
        saveLanguages(list || []);
      }
      setStoredLanguages(list || []);
      setLanguages(list || []);

    } catch (err) {
      Alert.alert('Erro to fetch languages');
    }
  }

  const handleSearch = async(value) => {
    const reg = RegExp(value.toLowerCase());
    const filteredList = value && storedLanguages ? storedLanguages
      .filter(l => reg.test(l.title.toLowerCase()))
      : storedLanguages;

    setSearch(value);
    setLanguages(filteredList);
  }

  const handleOpenModal = () => {
    updateLanguageModalSubject();
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchLanguage();
    const subs = languagesSubject.subscribe(() => {
      fetchLanguage();
    });

    // TODO remove this for Production version
    // removeData('languages');

    return () => {
      if (subs) subs.unsubscribe();
    }
  }, []);


  useEffect(() => {
    const subs = languageModalSubject.subscribe((item) => {
      setShowModal(true);
      setItem(item);
    });

    return () => {
      if (subs) subs.unsubscribe();
    }
  }, []);


  return (
    <View style={{ padding: 16, flex: 1 }}>
      <StatusBar barStyle='light-content' />
      <Input
        value={search} onChange={handleSearch}
        placeholder='Search' style={{ marginBottom: 0, marginTop: 0 }}
      />

      {languages.length ? (
        <ScrollView alwaysBounceHorizontal={false} style={{ marginRight: -8, paddingRight: 8 }}>
          {languages.map((l, i) => (
            <LanguageItem key={i} {...l} />
          ))}
        </ScrollView>
      ) : (
        <Empty title='You have no languages added so far.' />
      )}

      <Button onPress={handleOpenModal} style={{ marginBottom: 0 }}>
        <Text bold>Add language</Text>
      </Button>

      <Modal show={showModal} closeModal={setShowModal} title='Language'>
        <LanguageCreate closeModal={setShowModal} item={item} />
      </Modal>
    </View>
  );
};

export default Language;