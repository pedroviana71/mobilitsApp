import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppButton from '../custom/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {COLORS, FONTS} from '../../utils/styles';
import ScreenHeader from '../custom/ScreenHeader';
import {useGetAccountsQuery} from '../../services/account';
import HorizontalSeparator from '../custom/HorizontalSeparator';
import {priceMask} from '../../utils/priceMask';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {BottomSheet} from '../custom/BottomSheet';

type AccountCreditCardManagerProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'AccountCreditCardManager'
  >;
};

const AccountCreditCardManager = ({
  navigation,
}: AccountCreditCardManagerProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const {data: accounts} = useGetAccountsQuery(user._id);

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <ScreenHeader
          preText="gerencie seus"
          actionText="cartões e contas correntes"
          backgroundColor={COLORS.green}
          justifyContent="flex-start"
        />
        <View>
          <View>
            <Text>Cartoes de credito</Text>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.titleContainer}>
              Contas correntes e carteira
            </Text>
            <HorizontalSeparator />
            <View>
              {accounts?.map((account, index) => (
                <Animated.View
                  entering={FadeInRight.delay(index * 100)}
                  key={account._id}
                  style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View
                      style={[
                        styles.colorMarker,
                        {backgroundColor: account.color},
                      ]}
                    />
                    <Text style={styles.name}>{account.name}</Text>
                  </View>
                  <View style={styles.balanceContainer}>
                    <Text style={styles.label}>Saldo disponivel:</Text>
                    <Text style={styles.currentBalance}>
                      R$ {priceMask(JSON.stringify(account.balance))}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Adicionar cartão ou conta"
          backgroundColor={COLORS.green}
          textColor={COLORS.black80}
          onPress={() => setIsOpen(true)}
          shadowColor={COLORS.black20}
          elevation={10}
        />
        <AppButton
          title="Voltar"
          backgroundColor={COLORS.white}
          textColor={COLORS.black80}
          onPress={() => navigation.goBack()}
          shadowColor={COLORS.black20}
          elevation={10}
        />
      </View>
      {isOpen && (
        <BottomSheet
          height={220}
          onClose={() => {
            setIsOpen(false);
          }}>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Conta corrente"
              backgroundColor={COLORS.black20}
              textColor={COLORS.black80}
              onPress={() => handleNavigation('NewAccount')}
              shadowColor={COLORS.black20}
              elevation={10}
            />
            <AppButton
              title="Cartão de crédito"
              backgroundColor={COLORS.black20}
              textColor={COLORS.black80}
              onPress={() => handleNavigation('NewCreditCard')}
              shadowColor={COLORS.black20}
              elevation={10}
            />
          </View>
        </BottomSheet>
      )}
    </View>
  );
};

export default AccountCreditCardManager;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.green,
    padding: 16,
    flexDirection: 'row',
  },
  headerName: {
    fontFamily: FONTS.light,
    color: COLORS.black80,
  },
  headerBold: {
    fontFamily: FONTS.semiBold,
    color: COLORS.black80,
  },
  colorMarker: {
    height: 36,
    width: 4,
    borderRadius: 4,
  },
  name: {
    fontFamily: FONTS.medium,
    color: COLORS.black80,
    fontSize: 24,
  },
  label: {
    fontFamily: FONTS.light,
    color: COLORS.black60,
  },
  currentBalance: {
    fontFamily: FONTS.medium,
    color: COLORS.black80,
    fontSize: 24,
  },
  cardContainer: {
    padding: 16,
    gap: 4,
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  titleContainer: {
    fontFamily: FONTS.medium,
    color: COLORS.black60,
    paddingBottom: 4,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 32,
    paddingHorizontal: 16,
    gap: 16,
  },
});
