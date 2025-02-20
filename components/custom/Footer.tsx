import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../App';
import {COLORS} from '../../utils/theme';
import {BottomSheet} from './BottomSheet';
import AppButton from './Button';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {useNavigation, useRoute} from '@react-navigation/native';

const Footer = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  function toggleSheet() {
    setIsBottomSheetOpen(prevState => !prevState);
  }

  const selectedScreen = (routeName?: string) => {
    if (routeName === route.name) {
      return {
        borderColor: COLORS.black80,
        iconColor: COLORS.black80,
      };
    }
    return {
      borderColor: '#FFF',
      iconColor: COLORS.black20,
    };
  };

  const iconStyle = (route: string) => {
    return [
      styles.icon,
      {
        borderTopWidth: 2,
        borderColor: selectedScreen(route).borderColor,
        color: selectedScreen(route).iconColor,
      },
    ];
  };

  return (
    <View>
      <View style={styles.container}>
        <Icon
          onPress={() => navigation.navigate('Home')}
          style={iconStyle('Home')}
          name="home"
        />
        <Icon style={iconStyle('Transactions')} name="list" />
        <Icon
          style={styles.addIcon}
          name="plus"
          onPress={handleOpenBottomSheet}
        />
        <Icon style={iconStyle('Statistics')} name="pie-chart" />
        <Icon
          style={iconStyle('Profile')}
          name="user"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      {isBottomSheetOpen && (
        <BottomSheet onClose={toggleSheet} height={320}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.title}>
              <Text>{user?.name}, o que vamos </Text>
              <Text style={styles.bold}>adicionar?</Text>
            </View>
            <AppButton
              onPress={() => {
                navigation.navigate('Revenue');
                toggleSheet();
              }}
              title="Receita"
              backgroundColor={COLORS.green}
              textColor={COLORS.black80}
              fontWeight="500"
              width="100%"
            />
            <AppButton
              onPress={() => {}}
              title="Despesa"
              backgroundColor={COLORS.red}
              textColor={COLORS.black80}
              fontWeight="500"
              width="100%"
            />
            <AppButton
              onPress={() => {}}
              title="Transferência"
              backgroundColor={COLORS.black20}
              textColor={COLORS.black80}
              fontWeight="500"
              width="100%"
            />
          </View>
        </BottomSheet>
      )}
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
  bottomSheetContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    flexDirection: 'row',
  },
  bold: {
    fontFamily: 'NotoSansMedium',
    color: COLORS.black80,
  },
  icon: {
    fontSize: 24,
    padding: 8,
    // borderTopWidth: 2,
  },
  addIcon: {
    backgroundColor: COLORS.green,
    fontSize: 24,
    padding: 10,
    color: COLORS.black80,
    borderRadius: 100,
    shadowColor: COLORS.black80,
    elevation: 15,
  },
});
