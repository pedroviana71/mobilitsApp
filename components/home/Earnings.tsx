import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VerticalSeparator from '../custom/VerticalSeparator';

const Earnings = () => {
  return (
    <>
      <View style={styles.dateContainer}>
        <Text style={styles.dateChoice}>Semana</Text>
        <Icon style={styles.arrowDateChoice} name="keyboard-arrow-down" />
      </View>
      <View style={styles.container}>
        <View style={styles.earningseExpensesContainer}>
          <View style={styles.earnings}>
            <Icon style={styles.arrowUp} name="arrow-upward" />
            <View>
              <Text>Receitas</Text>
              <Text style={styles.earningText}>R$ 5,00</Text>
            </View>
          </View>
          <View style={styles.expenses}>
            <Icon style={styles.arrowDown} name="arrow-downward" />
            <View>
              <Text>Receitas</Text>
              <Text style={styles.expenseText}>R$ - 5000,00</Text>
            </View>
          </View>
        </View>
        <VerticalSeparator separatorStyles={styles.separator} />
        <View style={styles.goals}>
          <Text>Meta</Text>
          <Text style={styles.earningText}>R$ 245,00</Text>
        </View>
      </View>
    </>
  );
};

export default Earnings;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingLeft: 16,
  },
  dateChoice: {
    fontSize: 18,
  },
  arrowDateChoice: {
    fontSize: 18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 8,
    marginHorizontal: 16,
    shadowColor: '#000000',
    elevation: 5,
  },
  earningseExpensesContainer: {
    flexDirection: 'column',
    paddingLeft: 8,
  },
  separator: {
    position: 'absolute',
    right: 180,
  },
  earnings: {
    paddingTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowUp: {
    fontSize: 32,
    color: '#4B9460',
  },
  earningText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B9460',
  },
  arrowDown: {
    fontSize: 32,
    color: '#FF6363',
  },
  expenseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6363',
  },
  expenses: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
  },
  goals: {
    height: 100,
    paddingRight: 8,
    paddingLeft: 24,
  },
});
