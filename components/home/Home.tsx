import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useApiCheckMutation, useLoginMutation} from '../../services/user';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  const [apiCheck] = useApiCheckMutation();

  const teste = async () => {
    console.log('teste');
    await apiCheck('').unwrap();
  };
  return (
    <View>
      <Text>PRIMEIRA TELA</Text>
      <Button title="LOGIN" onPress={teste} />
    </View>
  );
};

export default Home;
