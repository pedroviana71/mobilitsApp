import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Earnings from './Earnings';
import Goals from './Goals';
import Footer from './Footer';
import {useGetUserQuery} from '../../services/user';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {setUserId} from '../../features/userSlice';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const {data: user} = useGetUserQuery(id);

  useEffect(() => {
    const getUserId = async () => {
      const id = await Keychain.getInternetCredentials('userId');
      const password = id ? id.password : '';
      setId(password);
      dispatch(setUserId(password));
    };
    getUserId();
  }, []);

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
