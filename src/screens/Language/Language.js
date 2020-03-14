import React, { useState, useEffect } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import LanguageCreate from '../../screens/LanguageCreate';
import Text from '../../components/atoms/Text';
import Modal from '../../components/molecules/Modal';
import LanguageItem from '../../components/molecules/LanguageItem';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import { getData, removeData } from '../../helpers/asyncStorage';
import { languagesSubject } from '../../helpers/observers';

const Language = () => {
  const [search, setSearch] = useState('');
  const [languages, setLanguages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const fetchLanguage = async() => {
    try {
      const list = await getData('languages');

      if (list) setLanguages(list);
    } catch (err) {
      Alert.alert('Erro to fetch languages');
    }
  }

  const handleSearch = async(value) => {
    const reg = RegExp(value.toLowerCase());
    const list = await getData('languages');
    const filteredList = value ? list
      .filter(l => reg.test(l.title.toLowerCase()))
      : list;
    
    setSearch(value);
    setLanguages(filteredList);
  }

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

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <StatusBar barStyle='light-content' />
      <Text bold>Languages</Text>

      <Input
        value={search} onChange={handleSearch}
        placeholder='Search' style={{ marginBottom: 0 }}
      />

      <ScrollView alwaysBounceHorizontal={false} style={{ marginRight: -8, paddingRight: 8 }}>
        {languages.map((l, i) => (
          <LanguageItem key={i} {...l} />
        ))}
      </ScrollView>

      <Button onPress={() => setShowModal(!showModal)} style={{ marginBottom: 0 }}>
        <Text bold>Add language</Text>
      </Button>

      <Modal show={showModal} closeModal={setShowModal}>
        <LanguageCreate closeModal={setShowModal} />
      </Modal>
    </View>
  );
  };

export default Language;