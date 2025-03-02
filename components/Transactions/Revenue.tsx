import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {COLORS, FONTS} from '../../utils/styles';
import Icon from 'react-native-vector-icons/Feather';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';
import CurrencyInput from '../custom/Form/CurrencyInput';
import HorizontalSeparator from '../custom/HorizontalSeparator';
import PickDate from '../custom/Form/PickDate';
import {DateTime} from 'luxon';
import PickPaymentType from '../custom/Form/PaymentType';
import ScreenHeader from '../custom/ScreenHeader';
// import PickPaymentType from './Form/PaymentType';

type RevenueProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Revenue'>;
};

export const PAYMENT_TYPES = {
  SINGLE: 'single',
  RECURRING: 'recurring',
} as const;

export type PaymentType = (typeof PAYMENT_TYPES)[keyof typeof PAYMENT_TYPES];

const Revenue = ({navigation}: RevenueProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(DateTime.now());
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PAYMENT_TYPES.SINGLE,
  );

  const handlePickTransaction = () => {};

  const handlePickTitle = () => {};

  return (
    <View style={styles.container}>
      <ScreenHeader
        preText="registre uma"
        actionText="receita"
        justifyContent="center"
      />
      <View style={styles.inputsContainer}>
        <CurrencyInput
          value={value}
          handleInputChange={setValue}
          color={COLORS.green}
        />
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
            style={[styles.textInput, {height: 96, textAlignVertical: 'top'}]}
            value={description}
            onChange={e => setDescription(e.nativeEvent.text)}
            placeholderTextColor={COLORS.black20}
            maxLength={255}
            multiline
          />
        </View>
        <HorizontalSeparator />
        <PickDate
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
        {/* <SelectList /> */}
      </View>
    </View>
  );
};

export default Revenue;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    height: '100%',
  },
  inputsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingBottom: 100,
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
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
});
