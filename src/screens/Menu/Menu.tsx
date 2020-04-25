import React, { useEffect, useState } from 'react';
import { Alert, View, LayoutAnimation } from 'react-native';
import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import Wrapper from '../../components/atoms/Wrapper';
import GoogleIcon from '../../components/atoms/Icon/Google';
import { storeData, retrieveData } from '../../helpers/asyncStorage';
import { login, logout } from '../../actions/account';
import { animationSpring } from '../../consts/animation';
import { COLORS } from '../../consts/colors';
import { updateLanguages } from '../../helpers/observers';
import { getLanguages } from '../../actions/languages';
import styles from './styles';

interface uType {
  givenName: string;
  familyName: string;
}

const Menu = () => {
  const [user, setUser] = useState<uType>();

  const handleSignIn = async () => {
    try {
      const account = await login();

      if (account && account.user) {
        LayoutAnimation.configureNext(animationSpring);
        await storeData('account', account);

        const googleList = await getLanguages();

        if (googleList) {
          await storeData('languages', googleList.val());
        }

        setUser(account.user);
        updateLanguages();
      } else {
        Alert.alert('Something went wrong, please try again!');
      }
    } catch (err) {
      console.warn('Login error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await logout();

      if (result) {
        LayoutAnimation.configureNext(animationSpring);
        storeData('account', null);
        setUser(undefined);
      }
    } catch (err) {
      console.warn('Logout error:', err);
    }
  };

  const getData = async () => {
    const account = await retrieveData('account');

    if (account && account.user) {
      setUser(account.user);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const LoginText = () => (
    <Wrapper>
      <Text style={styles.loginTitle} bold>
        Welcome!
      </Text>
      <Text style={styles.loginDescription}>
        When logged in, your languages will be saved in the cloud automatically,
        keeping your data saved in case you change the device.
      </Text>
    </Wrapper>
  );

  const LoggedInText = () => (
    <Wrapper>
      <View style={styles.loggedTitleContainer}>
        <Text style={styles.loggedTitle} bold>
          Welcome!
        </Text>
        <Text style={styles.loggedUserName}>
          {`${user?.givenName} ${user?.familyName}`}
        </Text>
      </View>
      <Text style={styles.loggedDescription}>
        As you are logged in with your google account, your languages are being
        saved in google realtime database.
      </Text>
    </Wrapper>
  );

  const SignInButton = () => (
    <Button onPress={handleSignIn}>
      <GoogleIcon size={22} color={COLORS.black} />
      <Text bold style={styles.buttonSignInTitle} fontSize={16}>
        Sign In with Google
      </Text>
    </Button>
  );

  const SignOutButton = () => (
    <Button onPress={handleSignOut} style={styles.buttonSignOut}>
      <Text bold style={styles.buttonSignOutTitle} fontSize={16}>
        Sign Out
      </Text>
    </Button>
  );

  return (
    <View style={styles.container}>
      {user ? <LoggedInText /> : <LoginText />}
      <Wrapper style={styles.wrapper}>
        {user ? <SignOutButton /> : <SignInButton />}
      </Wrapper>
    </View>
  );
};

export default Menu;
