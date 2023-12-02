import {StyleSheet} from 'react-native';
import React from 'react';
import {View} from 'react-native';

const HorizontalSeparator = () => {
  return <View style={styles.separator} />;
};

export default HorizontalSeparator;

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: '#E9ECED',
    borderBottomWidth: 1,
    width: '100%',
  },
});
