import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FormRevenueExpense from './FormRevenueExpense';
import AppButton from '../custom/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type CreateRevenueExpenseProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const CreateRevenueExpense = ({navigation}: CreateRevenueExpenseProps) => {
  const [isRevenue, setIsRevenue] = useState(true);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRevenue ? 'Adicionar Receita' : 'Adicionar Despesa'}
      </Text>
      <View style={styles.inputsContainer}>
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
        <FormRevenueExpense isRevenue={isRevenue} navigation={navigation} />
      </View>
    </View>
  );
};

export default CreateRevenueExpense;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4B9460',
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
  title: {
    fontSize: 30,
    paddingVertical: 16,
    marginLeft: 16,
    fontWeight: '600',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
});
