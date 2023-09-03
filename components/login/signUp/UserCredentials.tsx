import React, {useEffect, useState} from 'react';
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
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (password && passwordConfirmation && email) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [password, passwordConfirmation, email]);

  const handleEmail = (userEmail: string) => {
    setEmail(userEmail);
  };

  const handlePassword = (pwd: string) => {
    setIsPasswordValid(true);
    setPassword(pwd);
  };

  const handlePasswordConfirmation = (confirmPwd: string) => {
    setIsPasswordValid(true);
    setPasswordConfirmation(confirmPwd);
  };

  const handleSubmit = () => {
    if (password !== passwordConfirmation) {
      setIsPasswordValid(false);
    }

    if (!canSubmit) {
      return;
    }

    if (!isPasswordValid) {
      return;
    }

    dispatch(setUserEmail(email));
    navigation.navigate('UserNames');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Criar conta</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={handleEmail}
            value={email}
            style={styles.input}
            autoCapitalize="none"
          />
          <View style={!isPasswordValid && styles.inputView}>
            <TextInput
              placeholder="Senha"
              onChangeText={handlePassword}
              value={password}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={!isPasswordValid && styles.inputView}>
            <TextInput
              placeholder="Digite a senha novamente"
              onChangeText={handlePasswordConfirmation}
              value={passwordConfirmation}
              style={styles.input}
              secureTextEntry
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={handleSubmit}
          title="Próximo"
          backgroundColor={canSubmit ? '#5DB075' : '#90C59F'}
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
  inputsContainer: {
    gap: 16,
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'red',
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    paddingLeft: 8,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
});
