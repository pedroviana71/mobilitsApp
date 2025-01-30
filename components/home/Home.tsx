import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import Balance from './Balance';
import Goals from './Goals';
import Footer from './Footer';
import {useGetUserQuery} from '../../services/user';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {setUserId} from '../../features/userSlice';
import {COLORS, FONTS} from '../../utils/theme';
import RecentTransactions from './RecentTransactions';

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
      <View>
        <View style={styles.greetingsContainer}>
          <Text style={styles.greetings}>
            {user?.name ? `Olá, ${user.name}` : 'Olá'}
          </Text>
          <Icon style={styles.icon} name="menu" />
        </View>
        <Balance />
        <RecentTransactions />
        {/* <Goals /> */}
      </View>
      <Footer navigation={navigation.navigate} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
  },
  greetingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  greetings: {
    fontSize: 32,
    color: COLORS.black80,
    fontFamily: FONTS.regular,
  },
  icon: {
    fontSize: 32,
    color: COLORS.black80,
  },
});
