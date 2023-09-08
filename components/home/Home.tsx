import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useLoginMutation} from '../../services/user';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  const [text, setText] = useState('');
  const [login] = useLoginMutation();

  const user = async () => {
    const response = await login({email: 'tsa@gmail.com', password: 'latela'});
    console.log(response);
    setText(JSON.stringify(response));
    navigation.navigate('Welcome');
    return response;
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
