import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useLoginMutation} from '../../services/user';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  const [text, setText] = useState('');
  const [login] = useLoginMutation();

  const user = async () => {
    const accessToken = await Keychain.getGenericPassword();

    console.log(accessToken);
  };

  return (
    <View>
      <Text>PRIMEIRA TELA</Text>
      <Button title="LOGIN" onPress={() => user()} />
      <Text>{text}</Text>
    </View>
  );
};

export default Home;
