import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {COLORS, FONTS} from '../../utils/styles';
import Icon from 'react-native-vector-icons/Feather';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';
import CurrencyInput from '../custom/Form/CurrencyInput';
import HorizontalSeparator from '../custom/HorizontalSeparator';
import QuickPickDate from '../custom/Form/QuickPickDate';
import {DateTime} from 'luxon';
import PickPaymentType from '../custom/Form/PickPaymentType';
import ScreenHeader from '../custom/ScreenHeader';
import MenuDropdown from '../custom/Form/MenuDropdown';
import {useGetAccountsQuery} from '../../services/account';
import AppButton from '../custom/Button';
// import PickPaymentType from './Form/PaymentType';

type RevenueProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Revenue'>;
};

export const PAYMENT_TYPES = {
  SINGLE: 'single',
  RECURRING: 'recurring',
  INSTALLMENT: 'installment',
} as const;

export type PaymentType = (typeof PAYMENT_TYPES)[keyof typeof PAYMENT_TYPES];
type accountType = {_id: string; name: string} | '';

const Revenue = ({navigation}: RevenueProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('');
  const [account, setAccount] = useState<accountType>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(DateTime.now());
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PAYMENT_TYPES.SINGLE,
  );
  const {data: accounts} = useGetAccountsQuery(user._id);

  const handleAccountSelection = () => {
    // setAccount();
  };

  const handlePickTransaction = () => {};

  const handlePickTitle = () => {};

  return (
    <View style={styles.container}>
      <ScreenHeader
        preText="registre uma"
        actionText="receita"
        justifyContent="center"
      />
      <ScrollView
        style={styles.inputsContainer}
        contentContainerStyle={{padding: 16}}>
        <CurrencyInput handleInputChange={setValue} color={COLORS.green} />
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            placeholder="Digite o título"
            style={styles.textInput}
            value={title}
            onChange={e => setTitle(e.nativeEvent.text)}
            placeholderTextColor={COLORS.black20}
            maxLength={55}
          />
        </View>
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            placeholder="Digite a descrição"
            style={[styles.textInput, {height: 61, textAlignVertical: 'top'}]}
            value={description}
            onChange={e => setDescription(e.nativeEvent.text)}
            placeholderTextColor={COLORS.black20}
            maxLength={255}
            multiline
          />
        </View>
        <HorizontalSeparator />
        <QuickPickDate
          date={date}
          setDate={setDate}
          backgroundColor={COLORS.green}
        />
        <HorizontalSeparator />
        <PickPaymentType
          paymentType={paymentType}
          setPaymentType={setPaymentType}
        />
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Text style={styles.label}>Conta</Text>
          <MenuDropdown
            label="Selecione a conta"
            selectedItem={account}
            handleInputItem={setAccount}
            data={accounts ?? []}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Salvar"
          backgroundColor={COLORS.green}
          textColor={COLORS.black80}
          onPress={() => {}}
          shadowColor={COLORS.black20}
          elevation={10}
        />
        <AppButton
          title="Cancelar"
          backgroundColor={COLORS.white}
          textColor={COLORS.black80}
          onPress={() => navigation.navigate('AccountCreditCardManager')}
          shadowColor={COLORS.black20}
          elevation={10}
        />
      </View>
    </View>
  );
};

export default Revenue;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    height: '100%',
    flexGrow: 1,
  },
  inputsContainer: {
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  inputs: {
    marginVertical: 16,
    gap: 8,
  },
  label: {
    fontFamily: FONTS.medium,
  },
  textInput: {
    fontFamily: FONTS.medium,
    borderRadius: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.black20,
  },
  buttonContainer: {
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
});
