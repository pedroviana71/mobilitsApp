import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserEmail, setUserPassword} from '../../../features/userSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';
import InputAlert from '../../custom/InputAlert';
import {emailValidation} from '../../../utils/formValidations/emailValidation';
import {passwordValidation} from '../../../utils/formValidations/passwordValidation';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const UserCredentials = ({navigation}: UserCredentialsProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordMatchs, setPasswordMatchs] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
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
    setIsEmailValid(true);
    setEmail(userEmail);
  };

  const handlePassword = (pwd: string) => {
    setPassword(pwd);
    setIsPasswordValid(true);
    setPasswordMatchs(true);
  };

  const handlePasswordConfirmation = (confirmPwd: string) => {
    setPasswordMatchs(true);
    setPasswordConfirmation(confirmPwd);
  };

  const handleSubmit = () => {
    const isEmail = emailValidation(email);
    const passwordValid = passwordValidation(password);

    if (!isEmail) {
      setIsEmailValid(false);
      return;
    }
    if (!passwordValid) {
      setIsPasswordValid(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setPasswordMatchs(false);
      return;
    }

    if (!canSubmit) {
      return;
    }

    dispatch(setUserEmail(email));
    dispatch(setUserPassword(password));
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
          <View>
            <Text style={styles.label}>Email</Text>
            <View style={!passwordMatchs && styles.inputView}>
              <TextInput
                placeholder="Email"
                onChangeText={handleEmail}
                value={email}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {!isEmailValid && <InputAlert text="Email inválido" />}
          </View>
          <View>
            <Text style={styles.label}>Senha</Text>
            <View style={!passwordMatchs && styles.inputView}>
              <TextInput
                placeholder="Senha"
                onChangeText={handlePassword}
                value={password}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Repita a senha</Text>
            <View style={!passwordMatchs && styles.inputView}>
              <TextInput
                placeholder="Digite a senha novamente"
                onChangeText={handlePasswordConfirmation}
                value={passwordConfirmation}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
            {!passwordMatchs && (
              <InputAlert text="As senhas devem ser iguais" />
            )}
            {!isPasswordValid && (
              <InputAlert text="A senha deve ter no mínimo 8 caracteres" />
            )}
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
    borderColor: '#EC5B5B',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  passwordAlert: {
    color: '#EC5B5B',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 4,
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
