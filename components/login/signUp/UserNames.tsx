import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';

const UserNames = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user, 'user');
  return (
    <View>
      <Text>Username</Text>
    </View>
  );
};

export default UserNames;
