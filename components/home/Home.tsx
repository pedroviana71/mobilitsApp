import React from 'react';
import {Button, Text, View} from 'react-native';
import {useApiCheckMutation} from '../../services/user';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  const [apiCheck] = useApiCheckMutation();
  const teste = async () => {
    const oi = await apiCheck('').unwrap();
    console.log(oi);
  };

  const handleLogout = () => {
    try {
      Keychain.resetInternetCredentials('accessToken');
      Keychain.resetInternetCredentials('refreshToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>PRIMEIRA TELA</Text>
      <Button title="LOGIN" onPress={teste} />
      <Button title="LOGOUT" onPress={handleLogout} />
    </View>
  );
};

export default Home;
