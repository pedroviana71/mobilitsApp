import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import AppButton from '../../custom/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (text: string) => {
    setEmail(text);
  };

  const handlePassword = (pwd: string) => {
    setPassword(pwd);
  };

  const handleSignIn = () => {};

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
          onPress={handleSignIn}
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
