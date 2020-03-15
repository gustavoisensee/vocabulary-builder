import React from 'react';
import { TextInput } from 'react-native';

const Input = ({ error, value, style, onChange, ...rest }) => {
  const errorStyle = error ? {
    borderBottomColor: 'red'
  } : {};

  return (
    <TextInput
      style={{
        borderRadius: 3,
        backgroundColor: '#ECECEC',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginVertical: 16,
        ...errorStyle,
        ...style
      }}
      onChangeText={text => onChange(text)}
      value={value}
      {...rest}
    />
  );
};

export default Input;
