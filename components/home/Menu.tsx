import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {COLORS, FONTS} from '../../utils/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HorizontalSeparator from '../custom/HorizontalSeparator';

type MenuScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Menu'>;
};

const Menu = ({navigation}: MenuScreenProps) => {
  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Animated.Text entering={FadeInRight.delay(100)} style={styles.text}>
          Contas Recorrentes
        </Animated.Text>
      </TouchableOpacity>
      <HorizontalSeparator />
      <TouchableOpacity
        onPress={() => navigation.navigate('AccountCreditCardManager')}>
        <Animated.Text entering={FadeInRight.delay(150)} style={styles.text}>
          Gerenciar cartões de cŕedito
        </Animated.Text>
      </TouchableOpacity>
      <HorizontalSeparator />
      <TouchableOpacity
        onPress={() => navigation.navigate('AccountCreditCardManager')}>
        <Animated.Text entering={FadeInRight.delay(200)} style={styles.text}>
          Gerenciar contas
        </Animated.Text>
      </TouchableOpacity>
      <HorizontalSeparator />
      <TouchableOpacity onPress={() => {}}>
        <Animated.Text entering={FadeInRight.delay(250)} style={styles.text}>
          Gráficos e tendências
        </Animated.Text>
      </TouchableOpacity>
      <HorizontalSeparator />
      <TouchableOpacity onPress={() => {}}>
        <Animated.Text entering={FadeInRight.delay(300)} style={styles.text}>
          Metas
        </Animated.Text>
      </TouchableOpacity>
      <HorizontalSeparator />
      <TouchableOpacity onPress={() => {}}>
        <Animated.Text entering={FadeInRight.delay(350)} style={styles.text}>
          Perfil
        </Animated.Text>
      </TouchableOpacity>
      <HorizontalSeparator />
      <TouchableOpacity onPress={() => {}}>
        <Animated.Text entering={FadeInRight.delay(400)} style={styles.text}>
          Transações
        </Animated.Text>
      </TouchableOpacity>
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
