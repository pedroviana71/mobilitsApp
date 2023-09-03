import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const Welcome = ({navigation}: WelcomeScreenProps) => {
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
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 32,
  },
});

export default Welcome;
