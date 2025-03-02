import React from 'react';
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
  const {data: accounts} = useGetAccountsQuery(user._id);

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
            <Text style={styles.titleContainer}>Contas correntes</Text>
            <HorizontalSeparator />
            <View>
              {accounts?.map(account => (
                <View key={account._id}>
                  <Text>{account.name}</Text>
                  <Text>{account.balance}</Text>
                </View>
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
          onPress={() => {
            navigation.navigate('NewAccount');
          }}
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
  cardContainer: {},
  titleContainer: {},
  buttonContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
    gap: 16,
  },
});
