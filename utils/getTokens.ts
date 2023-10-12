import * as Keychain from 'react-native-keychain';

const getTokens = async () => {
  const accessToken = await Keychain.getInternetCredentials('accessToken');
  const refreshToken = await Keychain.getInternetCredentials('refreshToken');

  if (accessToken === false || refreshToken === false) {
    return false;
  }
  if (accessToken.password && refreshToken.password) {
    return {
      accessToken: accessToken.password,
      refreshToken: refreshToken.password,
    };
  }
};

export default getTokens;
