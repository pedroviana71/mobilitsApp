import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {COLORS, FONTS} from '../../utils/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HorizontalSeparator from '../custom/HorizontalSeparator';
import {delay} from '@reduxjs/toolkit/dist/utils';

type MenuScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Menu'>;
};
interface screen {
  name: keyof RootStackParamList;
  title: string;
  delay: number;
}

const screens: screen[] = [
  {
    name: 'AccountCreditCardManager',
    title: 'Gerenciar contas e cartões',
    delay: 100,
  },
  {
    name: 'Home',
    title: 'Metas',
    delay: 150,
  },
  {
    name: 'Profile',
    title: 'Perfil',
    delay: 200,
  },
  // {
  //   name: 'Home',
  //   title: 'Transações',
  //   delay: 250,
  // },
  // {
  //   name: 'Home',
  //   title: 'Contas recorrentes',
  //   delay: 250,
  // },
];

const Menu = ({navigation}: MenuScreenProps) => {
  return (
    <Animated.View style={styles.container}>
      {screens.map((screen, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screen.name as keyof RootStackParamList);
            }}>
            <Animated.Text
              entering={FadeInRight.delay(100)}
              style={styles.text}>
              {screen.title}
            </Animated.Text>
          </TouchableOpacity>
          <HorizontalSeparator />
        </View>
      ))}
    </Animated.View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background,
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  text: {
    color: COLORS.black80,
    fontSize: 24,
    fontFamily: FONTS.light,
  },
});
