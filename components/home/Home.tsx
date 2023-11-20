import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Earnings from './Earnings';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  return (
    <View>
      <View>
        <Text>Oi, Usuario</Text>
        <Icon name="person" />
      </View>
      <Earnings />
    </View>
  );
};

export default Home;
