import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const CarInformartions = () => {
  const states = useSelector(state => state);

  console.log(states);
  return (
    <View>
      <Text>teste</Text>
    </View>
  );
};

export default CarInformartions;
