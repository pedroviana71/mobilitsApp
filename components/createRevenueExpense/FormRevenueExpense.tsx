import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HorizontalSeparator from '../custom/HorizontalSeparator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../custom/Button';

interface FormRevenueExpenseProps {
  isRevenue: boolean;
  setIsRevenue: Dispatch<SetStateAction<boolean>>;
}

const FormRevenueExpense = ({
  isRevenue,
  setIsRevenue,
}: FormRevenueExpenseProps) => {
  const [dateSelected, setDateSelected] = useState({
    today: true,
    yesterday: false,
    anotherDate: false,
  });
  const revenueSelected = 5;
  const notRevenueSelected = 2;
  const red = '#EC5B5B';
  const green = '#5DB075';
  const grayText = '#BDBDBD';
  const grayBg = '#E9ECED';
  const whiteBg = '#FFFFFF';

  const handleChangeRevenueExpense = () => {
    if (isRevenue) {
      return;
    }
    setIsRevenue(!isRevenue);
  };

  const handleChangeExpenseExpense = () => {
    if (!isRevenue) {
      return;
    }
    setIsRevenue(!isRevenue);
  };

  const handleDate = (date: string) => {
    if (date === 'today') {
      setDateSelected({today: true, yesterday: false, anotherDate: false});
    } else if (date === 'yesterday') {
      setDateSelected({today: false, yesterday: true, anotherDate: false});
    } else if (date === 'anotherDate') {
      setDateSelected({today: false, yesterday: false, anotherDate: true});
    }
  };

  return (
    <View style={styles.inputsContainer}>
      <View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Receita"
            onPress={handleChangeRevenueExpense}
            backgroundColor={isRevenue ? whiteBg : grayBg}
            elevation={isRevenue ? revenueSelected : notRevenueSelected}
            textColor={isRevenue ? green : grayText}
            width="49%"
            fontWeight="600"
          />
          <AppButton
            title={'Despesa'}
            onPress={handleChangeExpenseExpense}
            elevation={isRevenue ? notRevenueSelected : revenueSelected}
            backgroundColor={isRevenue ? grayBg : whiteBg}
            textColor={isRevenue ? grayText : red}
            width="49%"
            fontWeight="600"
          />
        </View>
        <View style={styles.inputs}>
          <Icon name="attach-money" style={styles.icon} />
          <TextInput placeholder="R$ 0,00" />
        </View>
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Icon name="calendar-month" style={styles.icon} />
          <TouchableOpacity onPress={() => handleDate('today')}>
            <Text
              style={
                dateSelected.today
                  ? styles.dateSelected
                  : styles.dateNotSelected
              }>
              Hoje
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDate('yesterday')}>
            <Text
              style={
                dateSelected.yesterday
                  ? styles.dateSelected
                  : styles.dateNotSelected
              }>
              Ontem
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDate('anotherDate')}>
            <Text
              style={
                dateSelected.anotherDate
                  ? styles.dateSelected
                  : styles.dateNotSelected
              }>
              Outro dia
            </Text>
          </TouchableOpacity>
        </View>
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Icon name="description" style={styles.icon} />
          <TextInput placeholder="Selecione o app" />
        </View>
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Icon name="comment" style={styles.icon} />
          <TextInput
            placeholder="Comentários (opcional)"
            style={styles.comments}
          />
        </View>
      </View>
      <AppButton title="Salvar" onPress={() => {}} backgroundColor="green" />
    </View>
  );
};

export default FormRevenueExpense;

const styles = StyleSheet.create({
  inputsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 16,
    height: Dimensions.get('window').height,
    paddingBottom: 100,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 24,
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dateSelected: {
    backgroundColor: '#5DB075',
    borderRadius: 8,
    marginHorizontal: 8,
    padding: 8,
  },
  dateNotSelected: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    marginHorizontal: 8,
    padding: 8,
  },
  comments: {
    padding: 8,
    marginLeft: 8,
    width: '90%',
    borderRadius: 8,
    borderColor: '#E8E8E8',
    height: 50,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
});
