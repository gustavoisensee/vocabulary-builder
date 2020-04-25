import { StyleSheet } from 'react-native';
import { COLORS } from '../../../consts/colors';
import { GUTTER } from '../../../consts/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: GUTTER
  },
  title: {
    color: COLORS.white,
    fontSize: GUTTER,
    fontWeight: '800'
  },
  buttonCloseTitle: {
    color: 'white',
    fontSize: GUTTER,
    fontWeight: '800'
  },
  content: {
    margin: GUTTER
  }
});

export default styles;
