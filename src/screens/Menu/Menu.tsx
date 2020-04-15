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
      console.warn(account);
      setUser(account.user);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const LoginText = () => (
    <Wrapper>
      <Text style={{ fontSize: 24, paddingBottom: 16 }} bold>
        Welcome!
      </Text>
      <Text style={{ fontSize: 18, lineHeight: 26 }}>
        When logged in, your languages will be saved in the cloud automatically,
        keeping your data saved in case you change the device.
      </Text>
    </Wrapper>
  );

  const LoggedInText = () => (
    <Wrapper>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{ fontSize: 24 }} bold>
          Welcome!
        </Text>
        <Text style={{ fontSize: 22, fontStyle: 'italic' }}>
          {`${user?.givenName} ${user?.familyName}`}}
        </Text>
      </View>
      <Text style={{ fontSize: 18, paddingBottom: 0, lineHeight: 26 }}>
        As you are logged in with your google account, your languages are being
        saved in google realtime database.
      </Text>
    </Wrapper>
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}
    >
      {user ? <LoggedInText /> : <LoginText />}
      <Wrapper style={{ flex: 1, width: '100%' }}>
        {user ? (
          <Button
            onPress={handleSignOut}
            style={{ backgroundColor: COLORS.secondary }}
          >
            <Text bold style={{ color: 'white' }}>
              Sign Out
            </Text>
          </Button>
        ) : (
          <Button onPress={handleSignIn}>
            <GoogleIcon size={22} color={COLORS.black} />
            <Text bold style={{ paddingLeft: 8 }}>
              Sign In with Google
            </Text>
          </Button>
        )}
      </Wrapper>
    </View>
  );
};

export default Menu;
