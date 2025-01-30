import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';


const RecentTransactions = () => {
  return (
    <View style={styles.container}>
      <Text>RecentTransactions</Text>
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {width: '100%'},
});
