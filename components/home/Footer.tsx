import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../App';
import { COLORS } from '../../utils/theme';
import { useRoute } from '@react-navigation/native';
type FooterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>['navigate'];
};

const Footer = ({navigation}: FooterProps) => {
  const handleNavigationRevenue = () => {
    navigation('Revenue');
  };

  const route = useRoute();

  useEffect(() => {
    console.log(route.name);
  }, [route]);


  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="home" />
      <Icon style={styles.icon} name="bar-chart" />
      <Icon style={styles.addIcon} name="plus" onPress={handleNavigationRevenue} />
      <Icon style={styles.icon} name="pie-chart" />
      <Icon style={styles.icon} name="user" />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 8,
    paddingBottom: 12,
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF', 

  },
  icon: {
    fontSize: 24,
    padding: 8,
    color: COLORS.black80,
  },
  addIcon: {
    backgroundColor: COLORS.green,
    fontSize: 24,
    padding: 8,
    color: COLORS.black80,
    borderRadius: 100,
    shadowColor: COLORS.black80,
    elevation: 15,
  },
});
