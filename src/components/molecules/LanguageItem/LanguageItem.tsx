import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../../atoms/Text';
import styles from './styles';

interface Props {
  title: string;
  words: Array<string>;
}

const LanguageItem: FC<Props> = (props) => {
  const navigation = useNavigation();

  const handleRedirect = () => {
    navigation.navigate('LanguageDetails', { item: { ...props } });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRedirect} style={styles.title}>
        <Text>{props.title}</Text>
        <Text bold>{`${props?.words?.length || 0} words`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageItem;
