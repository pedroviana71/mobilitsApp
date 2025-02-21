import * as Keychain from 'react-native-keychain';
import {CONSTANTS} from './constants';

export const resetTokens = async () => {
  await Keychain.resetInternetCredentials(CONSTANTS.ACCESS_TOKEN);
  await Keychain.resetInternetCredentials(CONSTANTS.REFRESH_TOKEN);
  await Keychain.resetInternetCredentials(CONSTANTS.USER_ID);
};
