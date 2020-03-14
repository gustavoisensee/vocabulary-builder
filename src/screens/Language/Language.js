import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import LanguageCreate from '../../screens/LanguageCreate';
import Text from '../../components/atoms/Text';
import Modal from '../../components/molecules/Modal';
import LanguageItem from '../../components/molecules/LanguageItem';
import Button from '../../components/atoms/Button';
import { getData } from '../../helpers/asyncStorage';

const Language = () => {
  const [languages, setLanguages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const fetchLanguage = async() => {
    try {
      const list = await getData('languages');

      setLanguages(JSON.parse(list));
    } catch (err) {
      Alert.alert('Erro to fetch languages');
    }
  }

  useEffect(() => {
    fetchLanguage()
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <StatusBar barStyle='light-content' />
      <Text bold>Languages</Text>

      {languages.map((l, i) => (
        <LanguageItem key={i} {...l} />
      ))}

      <Button onPress={() => setShowModal(!showModal)}>
        <Text bold>Open modal</Text>
      </Button>

      <Modal show={showModal} closeModal={setShowModal}>
        <LanguageCreate closeModal={setShowModal} />
      </Modal>
    </View>
  );
  };

export default Language;