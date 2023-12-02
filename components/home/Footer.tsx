import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Footer = () => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="home" />
      <Icon style={styles.icon} name="bar-chart" />
      <Icon style={styles.addIcon} name="add" />
      <Icon style={styles.icon} name="bookmark-add" />
      <Icon style={styles.icon} name="settings" />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 8,
    position: 'absolute',
    width: '100%',
    bottom: -16,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    fontSize: 32,
    color: '#000000',
  },
  addIcon: {
    top: -30,
    backgroundColor: '#4B9460',
    fontSize: 30,
    color: '#FFFFFF',
    borderRadius: 100,
    padding: 16,
    shadowColor: '#000000',
    elevation: 3,
  },
});
