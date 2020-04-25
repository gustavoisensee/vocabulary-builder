import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';
import { GUTTER } from '../../consts/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerHiddenItem: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 2
  },
  buttonDeleteWord: {
    backgroundColor: COLORS.secondary,
    padding: 11,
    marginRight: 4
  },
  buttonEditWord: {
    backgroundColor: COLORS.tertiary,
    padding: 11
  },
  headerContainer: {
    paddingBottom: 0
  },
  headerText: {
    paddingBottom: 4
  },
  searchInput: {
    marginVertical: 0
  },
  row: {
    flexDirection: 'row'
  },
  flex: {
    flex: 1
  },
  wordContainer: {
    flex: 1,
    marginLeft: GUTTER,
    marginTop: 0
  },
  swipeContainer: {
    paddingRight: GUTTER
  },
  sectionHeaderContainer: {
    backgroundColor: COLORS.grey,
    marginTop: GUTTER,
    paddingVertical: GUTTER / 2,
    marginBottom: 0
  },
  sectionHeaderTitle: {
    marginLeft: GUTTER
  },
  buttonDeleteLanguage: {
    backgroundColor: COLORS.secondary,
    marginBottom: 0,
    marginTop: 0,
    flex: 1,
    marginRight: GUTTER / 2
  },
  buttonDeleteTitle: {
    color: COLORS.white
  },
  buttonNewWord: {
    marginVertical: 0,
    flex: 1,
    marginLeft: GUTTER / 2
  }
});

export default styles;
