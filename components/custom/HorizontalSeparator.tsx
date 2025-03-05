import {StyleSheet} from 'react-native';
import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../../utils/styles';

const HorizontalSeparator = () => {
  return <View style={styles.separator} />;
};

export default HorizontalSeparator;

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: COLORS.separator,
    borderBottomWidth: 1,
    width: '100%',
  },
});
