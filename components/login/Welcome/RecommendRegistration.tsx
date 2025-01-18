import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet, View, Image, StatusBar, Text} from 'react-native';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';
import {COLORS} from '../../../utils/theme';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const RecommendRegistration = ({navigation}: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#00E06102" />
      <View>
        <Image
          source={require('../../../assets/RecommendRegistration.png')}
          style={styles.logo}
        />
        <View>
          <Text>#Crie</Text>
          <Text>sua CONTA e tenha</Text>
        </View>
        <View>
          <View>
            <Text> Tenha seus dados salvos</Text>
          </View>
          <View>
            <Text> Recupere sua conta</Text>
          </View>
        </View>
        <Text>
          Com uma conta vocẽ consegue salvar seus dados e recuperar sua conta
          caso você perca acesso ao seu dispositivo.
        </Text>
      </View>
      <View style={styles.loginButtonContainer}>
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
          onPress={() => {}}
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
  },
  logo: {
    alignSelf: 'center',
    width: 320,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5DB075',
  },
  loginButtonContainer: {
    width: '100%',
    gap: 8,
  },
});

export default RecommendRegistration;
