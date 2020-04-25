import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

interface iType {
  error?: boolean;
  value: string | undefined;
  style?: any;
  onChange(a?: any): any;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const Input = ({ error, value, style, onChange, ...rest }: iType) => {
  const errorStyle = error ? styles.inputError : {};

  return (
    <TextInput
      style={[styles.input, errorStyle, style]}
      onChangeText={(text) => onChange(text)}
      value={value}
      {...rest}
    />
  );
};

export default Input;
