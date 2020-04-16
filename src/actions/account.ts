import * as Google from 'expo-google-app-auth';
import { retrieveData } from '../helpers/asyncStorage';
import googleConfig from '../../config/google.json';

export const login = async (): Promise<any> =>
  Google.logInAsync(googleConfig.signIn);

export const logout = async (): Promise<boolean> => {
  try {
    const { accessToken } = await retrieveData('account');

    await Google.logOutAsync({
      ...googleConfig.signIn,
      accessToken
    });

    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
