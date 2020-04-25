import { StyleSheet } from 'react-native';
import { GUTTER } from '../../../consts/styles';
import { COLORS } from '../../../consts/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginTop: GUTTER,
    paddingVertical: GUTTER,
    paddingHorizontal: GUTTER,
    borderRadius: 3,
    shadowColor: COLORS.fullBlack,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1
  },
  title: {
    marginBottom: GUTTER / 2
  }
});

export default styles;
