import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useLoginMutation} from '../../services/user';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  return (
    <View>
      <Text>PRIMEIRA TELA</Text>
      <Button title="LOGIN" onPress={() => {}} />
    </View>
  );
};

export default Home;
