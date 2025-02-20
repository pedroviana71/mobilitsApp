import * as Keychain from 'react-native-keychain';

const getTokensAndUserId = async () => {
  const accessToken = await Keychain.getInternetCredentials('accessToken');
  const refreshToken = await Keychain.getInternetCredentials('refreshToken');
  const userId = await Keychain.getInternetCredentials('userId');

  if (accessToken === false || refreshToken === false || userId === false) {
    return false;
  }
  if (accessToken.password && refreshToken.password) {
    return {
      accessToken: accessToken.password,
      refreshToken: refreshToken.password,
      userId: userId.password,
    };
  }
};

export default getTokensAndUserId;
