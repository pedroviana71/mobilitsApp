import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {PAYMENT_TYPES, PaymentType} from './Revenue';
import {Pressable} from 'react-native';
import {useGetCreditCardsQuery} from '../../services/creditcard';
import {useCreateTransactionMutation} from '../../services/transaction';
import {ICreateTransaction} from '../../types/transaction.types';
// import PickPaymentType from './Form/PaymentType';

type ExpenseProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Expense'>;
};
const PAYMENTS = {
  CREDIT_CARD: 'CREDIT_CARD',
  ACCOUNT: 'ACCOUNT',
} as const;
type payment = (typeof PAYMENTS)[keyof typeof PAYMENTS];
type accountType = {_id: string; name: string} | '';
type creditCardType = {_id: string; name: string} | '';

const Expense = ({navigation}: ExpenseProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('');
  const [payment, setIsPayment] = useState<payment | ''>('');
  const [account, setAccount] = useState<accountType>('');
  const [creditCard, setCreditCard] = useState<creditCardType>('');
  const [description, setDescription] = useState('');
  const [installments, setInstallments] = useState(0);
  const [date, setDate] = useState(DateTime.now());
  const {data: accounts} = useGetAccountsQuery(user._id);
  const {data: creditCards} = useGetCreditCardsQuery(user._id);
  const [createTransaction] = useCreateTransactionMutation();
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PAYMENT_TYPES.SINGLE,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateExpense = async () => {
    setIsLoading(true);
    const expense = {
      userId: user._id,
      amount: value,
      title,
      description,
      type: 'expense',
      paymentType,
      transactionDate: date.toISODate(),
      creditCardId: creditCard ? creditCard?._id : '',
      accountId: account ? account?._id : '',
      installments,
      recurringStartDate: date.toISODate(),
    } as ICreateTransaction;

    const expenseResponse = await createTransaction(expense);

    if ('error' in expenseResponse) {
      console.log(expenseResponse.error);
    }
    setIsLoading(false);
    navigation.navigate('Home');
  };

  const handleAccountInput = (accountItem: accountType) => {
    setCreditCard('');
    setAccount(accountItem);
  };

  const handleCreditCardInput = (creditCardItem: creditCardType) => {
    setAccount('');
    setCreditCard(creditCardItem);
  };

  useEffect(() => {
    if (paymentType === PAYMENT_TYPES.INSTALLMENT) {
      setIsPayment(PAYMENTS.CREDIT_CARD);
    } else {
      setIsPayment('');
    }
  }, [paymentType]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        preText="registre uma"
        actionText="despesa"
        justifyContent="center"
      />
      <ScrollView
        style={styles.inputsContainer}
        contentContainerStyle={{padding: 16}}>
        <CurrencyInput handleInputChange={setValue} color={COLORS.red} />
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
          backgroundColor={COLORS.red}
        />
        <HorizontalSeparator />
        <PickPaymentType
          paymentType={paymentType}
          setPaymentType={setPaymentType}
        />
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Text style={styles.label}>Conta ou cartão</Text>
          {!payment && (
            <View style={styles.pickCardAccountContainer}>
              <TouchableOpacity
                style={styles.pickCardAccount}
                onPress={() => setIsPayment(PAYMENTS.ACCOUNT)}>
                <Text>Adicionar conta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pickCardAccount}
                onPress={() => setIsPayment(PAYMENTS.CREDIT_CARD)}>
                <Text>Adicionar cartao</Text>
              </TouchableOpacity>
            </View>
          )}
          {payment === PAYMENTS.ACCOUNT && (
            <MenuDropdown
              label="Selecione a conta"
              selectedItem={account}
              handleInputItem={handleAccountInput}
              data={accounts ?? []}
            />
          )}
          {payment === PAYMENTS.CREDIT_CARD && (
            <MenuDropdown
              label="Selecione o cartão de crédito"
              selectedItem={creditCard}
              handleInputItem={handleCreditCardInput}
              data={creditCards ?? []}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Salvar"
          backgroundColor={COLORS.green}
          textColor={COLORS.black80}
          onPress={handleCreateExpense}
          shadowColor={COLORS.black20}
          elevation={10}
          loading={isLoading}
        />
        <AppButton
          title="Cancelar"
          backgroundColor={COLORS.white}
          textColor={COLORS.black80}
          onPress={() => navigation.navigate('Home')}
          shadowColor={COLORS.black20}
          elevation={10}
        />
      </View>
    </View>
  );
};

export default Expense;

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
  pickCardAccountContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
  },
  pickCardAccount: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    borderColor: COLORS.black20,
    borderWidth: 1,
  },
  buttonContainer: {
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
});
