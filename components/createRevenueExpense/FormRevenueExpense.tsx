import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import HorizontalSeparator from '../custom/HorizontalSeparator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../custom/Button';
import PickDate from './PickDate';
import Dropdown from '../custom/Dropdown';

interface FormRevenueExpenseProps {
  isRevenue: boolean;
}

const FormRevenueExpense = ({isRevenue}: FormRevenueExpenseProps) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputs}>
          <Icon name="attach-money" style={styles.icon} />
          <TextInput placeholder="R$ 0,00" style={styles.moneyInput} />
        </View>
        <HorizontalSeparator />
        <PickDate />
        <HorizontalSeparator />
        {isRevenue ? (
          <View style={styles.inputs}>
            <Icon name="description" style={styles.icon} />
            <Dropdown label="Selecionar o app" />
          </View>
        ) : (
          <View style={styles.inputs}>
            <Icon name="description" style={styles.icon} />
            <TextInput placeholder="Selecione a despesa" />
          </View>
        )}
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
  container: {
    height: '100%',
    flex: 1,
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
  moneyInput: {
    fontSize: 24,
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
