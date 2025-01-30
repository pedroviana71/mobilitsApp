import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Image, StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';
import {COLORS} from '../../../utils/theme';
import {useCreateAnonymousUserMutation} from '../../../services/user';
import * as Keychain from 'react-native-keychain';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const RecommendRegistration = ({navigation}: WelcomeScreenProps) => {
  const [createAnonymousUser] = useCreateAnonymousUserMutation();

  const handleAnonymousUserLogin = async () => {
    const userCreated = await createAnonymousUser();
    console.log(userCreated);    

    if ('error' in userCreated) {
      console.log(userCreated.error);
      return;
    }

    await Keychain.setInternetCredentials(
      'accessToken',
      'Anonymous',
      userCreated.data.tokens.accessToken,
    );
    await Keychain.setInternetCredentials(
      'refreshToken',
      'Anonymous',
      userCreated.data.tokens.refreshToken,
    );
    await Keychain.setInternetCredentials(
      'userId',
      'Anonymous',
      userCreated.data.user._id,
    );

    navigation.reset({index: 0, routes: [{name: 'Home'}]});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#00E06102" />
      <View style={styles.bannerContainer}>
        <View style={styles.hashtagContainer}>
          <Text style={styles.hashtagTitle}>#Crie</Text>
          <Text style={styles.hashtagText}>sua CONTA e tenha</Text>
        </View>
        <Image
          source={require('../../../assets/RecommendRegistration.png')}
          style={styles.fingerprint}
        />
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Icon name="key" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Sua saúde financeira salva na nuvem
            </Text>
          </View>
          <View style={styles.info}>
            <Icon name="pocket" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Recuperação de conta quando quiser
            </Text>
          </View>
        </View>
        <Text style={styles.legend}>
          Com uma conta vocẽ consegue salvar seus dados e recuperar sua conta
          caso você perca acesso ao seu dispositivo.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={() => navigation.navigate('UserCredentials')}
          title="Quero criar uma conta nova"
          backgroundColor={COLORS.green}
          textColor={COLORS.black80}
          fontWeight="500"
          elevation={10}
          shadowColor={COLORS.black60}
        />
        <AppButton
          onPress={() => handleAnonymousUserLogin()}
          title="Entrar sem registrar mesmo assim"
          textColor={COLORS.black60}
          fontWeight="500"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00E06102',
    padding: 16,
    fontFamily: 'NotoSansMedium',
  },
  bannerContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
  hashtagContainer: {
    marginLeft: 32,
  },
  hashtagTitle: {
    fontFamily: 'NotoSansSemiBold',
    fontSize: 32,
    color: COLORS.black80,
  },
  hashtagText: {
    fontFamily: 'NotoSansSemiBold',
    fontSize: 32,
    color: COLORS.black60,
    paddingLeft: 32,
  },
  infoContainer: {
    backgroundColor: COLORS.white,
    gap: 16,
    padding: 16,
    borderRadius: 15,
    elevation: 15,
    shadowColor: COLORS.black20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoText: {
    fontFamily: 'NotoSansMedium',
    fontSize: 16,
    color: COLORS.black60,
  },
  infoIcon: {
    fontSize: 24,
    color: COLORS.green,
  },
  fingerprint: {
    alignSelf: 'center',
    width: 320,
    resizeMode: 'contain',
  },
  legend: {
    fontFamily: 'NotoSansLight',
    fontSize: 12,
    color: COLORS.black80,
    textAlign: 'center',
    marginTop: 32,
    paddingHorizontal: 48,
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
  },
});

export default RecommendRegistration;
