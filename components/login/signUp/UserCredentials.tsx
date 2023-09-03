import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserEmail} from '../../../features/userSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const UserCredentials = ({navigation}: UserCredentialsProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();

  const handleEmail = (e: string) => {
    setEmail(e);
  };

  const handlePassword = (pwd: string) => {
    setPassword(pwd);
  };

  const handlePasswordConfirmation = (confirmPwd: string) => {
    setPasswordConfirmation(confirmPwd);
  };

  const handleSubmit = () => {
    dispatch(setUserEmail(email));
    console.log(email, password, passwordConfirmation);
    navigation.navigate('UserNames');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Criar conta</Text>
        <TextInput
          placeholder="Email"
          onChangeText={handleEmail}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          onChangeText={handlePassword}
          value={password}
          style={styles.input}
        />
        <TextInput
          placeholder="Digite a senha novamente"
          onChangeText={handlePasswordConfirmation}
          value={passwordConfirmation}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={handleSubmit}
          title="Próximo"
          backgroundColor="#5DB075"
          textColor="#E9ECED"
        />
        <AppButton
          onPress={handleGoBack}
          title="Entrar na conta"
          backgroundColor="transparent"
          textColor="#5DB075"
          fontWeight="600"
        />
      </View>
    </View>
  );
};

export default UserCredentials;

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
