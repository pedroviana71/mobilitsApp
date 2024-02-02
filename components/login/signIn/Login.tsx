import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import AppButton from '../../custom/Button';
import {useLoginMutation} from '../../../services/user';
import * as Keychain from 'react-native-keychain';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {resetTokens} from '../../../utils/resetTokens';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const Login = ({navigation}: UserCredentialsProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const handleEmail = (text: string) => {
    setEmail(text);
  };

  const handlePassword = (pwd: string) => {
    setPassword(pwd);
  };

  const handleSignIn = async () => {
    const response = await login({email, password});

    if ('error' in response) {
      console.log('response signin error', response.error);
      return;
    }

    console.log(response.data, 'response signin');

    const username = response.data.user.name;

    resetTokens();

    await Keychain.setInternetCredentials(
      'userId',
      username,
      response.data.user._id,
    );
    await Keychain.setInternetCredentials(
      'accessToken',
      username,
      response.data.tokens.accessToken,
    );
    await Keychain.setInternetCredentials(
      'refreshToken',
      username,
      response.data.tokens.refreshToken,
    );
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Entrar na conta</Text>
        <TextInput
          value={email}
          onChangeText={handleEmail}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={handlePassword}
          placeholder="Senha"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Entrar"
          backgroundColor="#5DB075"
          textColor="#E9ECED"
          onPress={handleSignIn}
        />
        <AppButton
          title="Esqueceu sua senha?"
          backgroundColor="#E9ECED"
          textColor="#5DB075"
          onPress={() => {}}
          fontWeight="600"
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#E9ECED',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#4B9460',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
});
