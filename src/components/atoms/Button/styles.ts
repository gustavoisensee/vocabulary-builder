import { StyleSheet } from 'react-native';
import { COLORS } from '../../../consts/colors';
import { GUTTER } from '../../../consts/styles';

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: GUTTER,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: COLORS.fullBlack,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    marginVertical: GUTTER
  }
});

export default styles;
