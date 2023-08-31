import React, {useState} from 'react';
import {
  Button,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserEmail} from '../../../features/userSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const UserCredentials = ({navigation}: UserCredentialsProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();

  const handleEmail = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setEmail(e.nativeEvent.text);
  };

  const handlePassword = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(e.nativeEvent.text);
  };

  const handlePasswordConfirmation = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPasswordConfirmation(e.nativeEvent.text);
  };

  const handleSubmit = () => {
    dispatch(setUserEmail(email));
    console.log(email, password, passwordConfirmation);
    navigation.navigate('UserNames');
  };

  return (
    <View>
      <Text>Credentials</Text>
      <TextInput placeholder="Email" onChange={handleEmail} value={email} />
      <TextInput
        placeholder="Senha"
        onChange={handlePassword}
        value={password}
      />
      <TextInput
        placeholder="Digite a senha novamente"
        onChange={handlePasswordConfirmation}
        value={passwordConfirmation}
      />
      <Button onPress={handleSubmit} title="Próximo" />
    </View>
  );
};

export default UserCredentials;
