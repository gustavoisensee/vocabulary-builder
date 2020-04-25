import { StyleSheet } from 'react-native';
import { COLORS } from '../../../consts/colors';
import { GUTTER } from '../../../consts/styles';

const styles = StyleSheet.create({
  input: {
    borderRadius: 3,
    backgroundColor: COLORS.grey,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: GUTTER,
    paddingHorizontal: GUTTER / 2,
    marginVertical: GUTTER,
    color: COLORS.black
  },
  inputError: {
    borderBottomColor: 'red'
  }
});

export default styles;
