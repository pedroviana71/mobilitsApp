import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../App';
import {COLORS} from '../../utils/theme';
import {useRoute} from '@react-navigation/native';
import {BottomSheet} from '../custom/BottomSheet';
type FooterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>['navigate'];
};

const Footer = ({navigation}: FooterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigationRevenue = () => {
    // navigation('Transactions');
    setIsOpen(true);
  };

  const route = useRoute();

  useEffect(() => {
    console.log(route.name);
  }, [route]);

  function toggleSheet() {
    setIsOpen(prevState => !prevState);
  }

  return (
    <View>
      <View style={styles.container}>
        <Icon style={styles.icon} name="home" />
        <Icon style={styles.icon} name="bar-chart" />
        <Icon
          style={styles.addIcon}
          name="plus"
          onPress={handleNavigationRevenue}
        />
        <Icon style={styles.icon} name="pie-chart" />
        <Icon style={styles.icon} name="user" />
      </View>
      <View>{isOpen && <BottomSheet onClose={toggleSheet} />}</View>
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
