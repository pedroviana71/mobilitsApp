import * as Keychain from 'react-native-keychain';
import {CONSTANTS} from './constants';

const getTokensAndUserId = async () => {
  const accessToken = await Keychain.getInternetCredentials(
    CONSTANTS.ACCESS_TOKEN,
  );
  const refreshToken = await Keychain.getInternetCredentials(
    CONSTANTS.REFRESH_TOKEN,
  );
  const userId = await Keychain.getInternetCredentials(CONSTANTS.USER_ID);

  console.log('userId Token', userId && userId.password);

  if (!accessToken || !refreshToken || !userId) {
    return null;
  }

  if (accessToken.password && refreshToken.password && userId.password) {
    return {
      accessToken: accessToken.password,
      refreshToken: refreshToken.password,
      userId: userId.password,
    };
  }
};

export default getTokensAndUserId;
