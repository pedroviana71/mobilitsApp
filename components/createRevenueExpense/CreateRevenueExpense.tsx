import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FormRevenueExpense from './FormRevenueExpense';

const CreateRevenueExpense = () => {
  const [isRevenue, setIsRevenue] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRevenue ? 'Adicionar Receita' : 'Adicionar Despesa'}
      </Text>
      <FormRevenueExpense isRevenue={isRevenue} setIsRevenue={setIsRevenue} />
    </View>
  );
};

export default CreateRevenueExpense;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4B9460',
  },
  title: {
    fontSize: 30,
    paddingVertical: 16,
    marginLeft: 16,
    fontWeight: '600',
    color: '#000000',
  },
});
