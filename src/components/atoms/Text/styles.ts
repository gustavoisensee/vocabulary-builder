import { StyleSheet } from 'react-native';
import { COLORS } from '../../../consts/colors';
import { GUTTER } from '../../../consts/styles';

const styles = StyleSheet.create({
  text: {
    minHeight: GUTTER,
    color: COLORS.black
  },
  bold: {
    fontWeight: '700'
  },
  hasPadding: {
    paddingBottom: GUTTER
  }
});

export default styles;
