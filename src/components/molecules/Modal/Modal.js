import React, { useEffect } from 'react';
import { Alert, Modal, View, Text, TouchableHighlight, StatusBar } from 'react-native';

const CustomModal = ({ children, show, closeModal, title }) => {
  useEffect(() => {
    const barStyle = show ? 'dark-content' : 'light-content';
    StatusBar.setBarStyle(barStyle);
  }, [show]);

  return (
    <Modal
      presentationStyle="pageSheet"
      animationType="slide"
      transparent={false}
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={{
        backgroundColor: 'black',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16
      }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '800' }}>{title}</Text>
        <TouchableHighlight onPress={() => closeModal(false)}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '800' }}>Close</Text>
        </TouchableHighlight>
      </View>
      <View style={{ margin: 16 }}>
          {children}
      </View>
    </Modal>
  )
};

CustomModal.defaultProps = {
  show: false,
  closeModal: () => {}
};

export default CustomModal;
