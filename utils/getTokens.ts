import * as Keychain from 'react-native-keychain';

const getTokens = async () => {
  const credentials = await Keychain.getGenericPassword();
  return credentials;
};

export default getTokens;
