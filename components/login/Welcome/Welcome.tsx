import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';
import getTokens from '../../../utils/getTokens';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const Welcome = ({navigation}: WelcomeScreenProps) => {
  useEffect(() => {
    const checkUser = async () => {
      const tokens = await getTokens();
      return tokens;
    };

    checkUser().then(user => {
      if (!user) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../assets/name.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>O app que guia seu dinheiro</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={() => navigation.navigate('Login')}
          title="Login"
          backgroundColor="#5DB075"
          textColor="#F6F6F6"
        />
        <AppButton
          onPress={() => navigation.navigate('UserCredentials')}
          title="Criar Conta"
          backgroundColor="#F6F6F6"
          textColor="#5DB075"
          fontWeight="bold"
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
    backgroundColor: '#E9ECED',
  },
  logo: {
    alignSelf: 'center',
    height: 80,
    width: 280,
    marginTop: 125,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5DB075',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 32,
  },
});

export default Welcome;
