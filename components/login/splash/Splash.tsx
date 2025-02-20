import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../features/userSlice';
import {useGetUserQuery} from '../../../services/user';
import getTokensAndUserId from '../../../utils/getTokens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {COLORS} from '../../../utils/theme';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const Splash = ({navigation}: WelcomeScreenProps) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const tokens = await getTokensAndUserId();
      if (tokens && tokens.userId) {
        setUserId(tokens.userId);
      } else {
        navigation.reset({index: 0, routes: [{name: 'Welcome'}]});
      }
    };
    checkUser();
  }, []);

  const {data: user} = useGetUserQuery(userId ?? '', {
    skip: !userId,
  });

  useEffect(() => {
    if (user) {
      console.log('dentro useEffect', user);

      dispatch(setUser(user));
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 160,
  },
});
