import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Earnings from './Earnings';
import Goals from './Goals';
import Footer from './Footer';
import {useGetUserQuery} from '../../services/user';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  const {data: user} = useGetUserQuery('65b63db63b9e8410c79d3790');

  return (
    <View style={styles.container}>
      <View style={styles.greetingsContainer}>
        <Text style={styles.greetings}>{user?.name}</Text>
        <Icon style={styles.icon} name="person" />
      </View>
      <Earnings />
      <Goals />
      <Footer navigate={navigation.navigate} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  greetingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
  greetings: {
    fontSize: 30,
    fontWeight: '500',
    color: '#000001',
  },
  icon: {
    fontSize: 30,
  },
});
