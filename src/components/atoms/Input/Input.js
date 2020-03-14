import React from 'react';
import { TextInput } from 'react-native';

const Input = ({ value, onChange }) => (
  <TextInput
    style={{
      borderRadius: 3,
      backgroundColor: '#ECECEC',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      paddingVertical: 16,
      paddingHorizontal: 8,
      marginVertical: 16
    }}
    onChangeText={text => onChange(text)}
    value={value}
  />
);

export default Input;
