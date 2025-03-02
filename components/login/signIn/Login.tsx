import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import AppButton from '../../custom/Button';
import {useLoginMutation} from '../../../services/user';
import * as Keychain from 'react-native-keychain';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {resetTokens} from '../../../utils/resetTokens';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../features/userSlice';
import getTokensAndUserId from '../../../utils/getTokens';
import {CONSTANTS} from '../../../utils/constants';
import {COLORS} from '../../../utils/styles';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Login = ({navigation}: UserCredentialsProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

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

    const username = response.data.user.name!;

    await Keychain.setInternetCredentials(
      CONSTANTS.USER_ID,
      username,
      response.data.user._id,
    );
    await Keychain.setInternetCredentials(
      CONSTANTS.ACCESS_TOKEN,
      username,
      response.data.tokens.accessToken,
    );
    await Keychain.setInternetCredentials(
      CONSTANTS.REFRESH_TOKEN,
      username,
      response.data.tokens.refreshToken,
    );

    dispatch(setUser(response.data.user));

    navigation.reset({index: 0, routes: [{name: 'Home'}]});
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Entrar na conta</Text>
        <TextInput
          value={email}
          onChangeText={handleEmail}
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={COLORS.black60}
        />
        <TextInput
          value={password}
          onChangeText={handlePassword}
          placeholder="Senha"
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          placeholderTextColor={COLORS.black60}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Entrar"
          backgroundColor={COLORS.green}
          textColor={COLORS.black80}
          onPress={handleSignIn}
          shadowColor={COLORS.black20}
          elevation={10}
        />
        <AppButton
          title="Esqueci a senha"
          backgroundColor={COLORS.white}
          textColor={COLORS.black80}
          onPress={() => {}}
          shadowColor={COLORS.black20}
          elevation={10}
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
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  formContainer: {
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: COLORS.black80,
    marginBottom: 32,
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
