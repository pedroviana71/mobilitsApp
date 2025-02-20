import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import Balance from './Balance';
import Goals from './Goals';
import Footer from '../custom/Footer';
import {useGetUserQuery} from '../../services/user';
import * as Keychain from 'react-native-keychain';
import {COLORS, FONTS} from '../../utils/theme';
import RecentTransactions from './RecentTransactions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({navigation}: HomeScreenProps) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.greetingsContainer}>
          <Text style={styles.greetings}>
            {user.name ? `Olá, ${user.name}` : 'Olá'}
          </Text>
          {/* quando clicar no menu lateral abrir uma outra rota */}
          <Icon style={styles.icon} name="menu" onPress={() => {}} />
        </View>
        <Balance />
        <RecentTransactions />
        {/* <Goals /> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    zIndex: 0,
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
