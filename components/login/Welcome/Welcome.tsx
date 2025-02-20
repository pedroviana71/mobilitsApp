import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';
import getTokensAndUserId from '../../../utils/getTokens';
import {COLORS} from '../../../utils/theme';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const Welcome = ({navigation}: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#00E06102" />
      <View>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <AppButton
          onPress={() => navigation.navigate('Login')}
          title="Entrar"
          backgroundColor={COLORS.green}
          textColor={COLORS.black80}
          fontWeight="500"
          elevation={10}
          shadowColor={COLORS.black60}
        />
        <AppButton
          onPress={() => navigation.navigate('UserCredentials')}
          title="Criar Conta"
          backgroundColor="#F6F6F6"
          textColor={COLORS.black80}
          fontWeight="500"
          elevation={10}
          shadowColor={COLORS.black60}
          fontSize={16}
        />
        <AppButton
          onPress={() => navigation.navigate('RecommendRegistration')}
          title="Entrar sem registrar"
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
  },
  logo: {
    alignSelf: 'center',
    width: 160,
    resizeMode: 'contain',
    marginTop: 64,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5DB075',
  },
  loginButtonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 24,
    marginBottom: 32,
  },
});

export default Welcome;
