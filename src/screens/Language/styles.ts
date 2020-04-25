import { StyleSheet } from 'react-native';
import { GUTTER } from '../../consts/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: GUTTER
  },
  searchInput: {
    marginBottom: 0,
    marginTop: 0
  },
  scrollView: {
    marginRight: -GUTTER / 2,
    paddingRight: GUTTER / 2
  },
  buttonAddLanguage: {
    marginBottom: 0
  }
});

export default styles;
