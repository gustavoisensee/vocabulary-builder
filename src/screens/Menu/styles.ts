import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';
import { GUTTER } from '../../consts/styles';

const styles = StyleSheet.create({
  loginTitle: {
    fontSize: 24,
    paddingBottom: GUTTER
  },
  loginDescription: {
    fontSize: 18,
    lineHeight: 26
  },
  loggedTitleContainer: {
    paddingBottom: GUTTER
  },
  loggedTitle: {
    fontSize: 24
  },
  loggedUserName: {
    fontSize: 22,
    fontStyle: 'italic'
  },
  loggedDescription: {
    fontSize: 18,
    paddingBottom: 0,
    lineHeight: 26
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  wrapper: {
    flex: 1,
    width: '100%'
  },
  buttonSignOut: {
    backgroundColor: COLORS.secondary
  },
  buttonSignOutTitle: {
    color: COLORS.white
  },
  buttonSignInTitle: {
    paddingLeft: GUTTER / 2
  }
});

export default styles;
