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
import {COLORS} from '../../../utils/theme';
import {useCreateUserMutation} from '../../../services/user';
import * as Keychain from 'react-native-keychain';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const UserCredentials = ({navigation}: UserCredentialsProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordMatchs, setPasswordMatchs] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);
  const dispatch = useDispatch();
  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    if (password && passwordConfirmation && email && name) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [password, passwordConfirmation, email, name]);

  const handleEmail = (userEmail: string) => {
    setIsEmailValid(true);
    setEmail(userEmail);
  };

  const handlePassword = (pwd: string) => {
    setPassword(pwd);
    setIsPasswordValid(true);
    setPasswordMatchs(true);
  };

  const handleName = (userName: string) => {
    setIsNameValid(true);
    setName(userName);
  };

  const handlePasswordConfirmation = (confirmPwd: string) => {
    setPasswordMatchs(true);
    setPasswordConfirmation(confirmPwd);
  };

  const handleSubmit = async () => {
    const isEmail = emailValidation(email);
    const passwordValid = passwordValidation(password, passwordConfirmation);

    if (!isEmail) {
      setIsEmailValid(false);
    }
    if (!passwordValid) {
      setIsPasswordValid(false);
    }

    if (name.length < 2) {
      setIsNameValid(false);
    }

    if (!canSubmit) {
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    const userCreated = await createUser(user);
    console.log(userCreated);

    if ('error' in userCreated) {
      console.log(userCreated.error);
      return;
    }

    await Keychain.setInternetCredentials(
      'accessToken',
      user.name,
      userCreated.data.tokens.accessToken,
    );
    await Keychain.setInternetCredentials(
      'refreshToken',
      user.name,
      userCreated.data.tokens.refreshToken,
    );
    await Keychain.setInternetCredentials(
      'userId',
      user.name,
      userCreated.data.user._id,
    );

    navigation.replace('Home');
  };

  const handleSendUserLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Criar conta</Text>
        <View style={styles.inputsContainer}>
          <View>
            <Text style={styles.label}>Nome</Text>
            <View style={!isNameValid && styles.inputView}>
              <TextInput
                placeholder="Nome"
                onChangeText={handleName}
                value={name}
                style={styles.input}
                autoCapitalize="words"
                keyboardType="default"
                placeholderTextColor={COLORS.black60}
              />
            </View>
            {!isNameValid && (
              <InputAlert text="Nome precisa ser maior que 2 caracteres." />
            )}
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <View style={!isEmailValid && styles.inputView}>
              <TextInput
                placeholder="Email"
                onChangeText={handleEmail}
                value={email}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor={COLORS.black60}
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
                placeholderTextColor={COLORS.black60}
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
                placeholderTextColor={COLORS.black60}
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
          backgroundColor={canSubmit ? COLORS.green : COLORS.green20}
          textColor={canSubmit ? COLORS.black80 : COLORS.black60}
          elevation={10}
          shadowColor={COLORS.black20}
        />
        <AppButton
          onPress={handleSendUserLogin}
          title="Entrar na conta"
          backgroundColor="transparent"
          textColor={COLORS.black60}
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
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: COLORS.black80,
    marginBottom: 16,
    fontFamily: 'NotoSansRegular',
  },
  inputsContainer: {
    paddingVertical: 32,
    gap: 24,
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#EC5B5B',
  },
  label: {
    fontSize: 16,
    color: COLORS.black80,
    marginBottom: 4,
    fontFamily: 'NotoSansRegular',
  },
  passwordAlert: {
    color: '#EC5B5B',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 4,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderColor: COLORS.black20,
    borderStyle: 'solid',
    borderWidth: 0.5,
    paddingLeft: 8,
    elevation: 6,
    shadowColor: COLORS.black20,
    fontFamily: 'NotoSansLight',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
});
