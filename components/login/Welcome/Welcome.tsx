import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const Welcome = ({navigation}: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/name.png')} style={styles.logo} />
      <Text>O app que guia seu dinheiro</Text>
      <View>
        <Button onPress={() => navigation.navigate('Login')} title="Login" />
        <Button
          onPress={() => navigation.navigate('UserCredentials')}
          title="Criar Conta"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  logo: {
    alignSelf: 'center',
    height: 80,
    width: 280,
  },
});

export default Welcome;
