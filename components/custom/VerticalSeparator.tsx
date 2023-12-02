import React from 'react';
import {StyleSheet, View} from 'react-native';

const VerticalSeparator = ({separatorStyles}: any) => {
  return <View style={[styles.separator, separatorStyles]} />;
};

export default VerticalSeparator;

const styles = StyleSheet.create({
  separator: {
    borderRightColor: '#E9ECED',
    borderRightWidth: 1,
    height: '100%',
  },
});
