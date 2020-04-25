import React, { useEffect } from 'react';
import {
  Alert,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StatusBar
} from 'react-native';
import styles from './styles';

interface cmType {
  children: any;
  show: boolean;
  closeModal(a?: any): void;
  title: string;
}

const CustomModal = ({ children, show, closeModal, title }: cmType) => {
  useEffect(() => {
    const barStyle = show ? 'dark-content' : 'light-content';
    StatusBar.setBarStyle(barStyle);
  }, [show]);

  return (
    <Modal
      presentationStyle='pageSheet'
      animationType='slide'
      transparent={false}
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableHighlight onPress={() => closeModal(false)}>
          <Text style={styles.buttonCloseTitle}>Close</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.content}>{children}</View>
    </Modal>
  );
};

CustomModal.defaultProps = {
  show: false,
  closeModal: () => {}
};

export default CustomModal;
