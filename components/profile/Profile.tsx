import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import AppButton from '../custom/Button';
import {useCreateAppMutation} from '../../services/transportationApp';
import * as Keychain from 'react-native-keychain';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const Profile = ({navigation}: UserCredentialsProps) => {
  return (
    <View style={styles.container}>
      <Text>asdjasndujasndujasnmd</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
});
