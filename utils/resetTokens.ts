import * as Keychain from 'react-native-keychain';

export const resetTokens = async () => {
  await Keychain.resetInternetCredentials('accessToken');
  await Keychain.resetInternetCredentials('refreshToken');
};
