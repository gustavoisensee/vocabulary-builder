import { StyleSheet } from 'react-native';
import { GUTTER } from '../../../consts/styles';
import { COLORS } from '../../../consts/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: GUTTER,
    padding: GUTTER,
    borderRadius: 3,
    shadowColor: COLORS.fullBlack,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    minHeight: 60
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default styles;
