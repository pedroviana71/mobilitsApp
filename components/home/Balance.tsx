import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../utils/styles';

const Balance = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.pickDate}>Mês atual</Text>
      </View>
      <View style={styles.balancesContainer}>
        <View style={styles.currentBalanceContainer}>
          <Text style={styles.currentBalanceLabel}>Saldo atual</Text>
          <Text style={styles.currentBalance}>R$ 5,00</Text>
        </View>
        <View style={styles.predictedBalanceContainer}>
          <Text style={styles.predictedBalancelabel}>Saldo previsto</Text>
          <Text style={styles.predictedBalance}>R$ - 5000,00</Text>
        </View>
      </View>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickDate: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  balancesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  currentBalanceContainer: {
    alignItems: 'flex-start',
    paddingLeft: 24,
    paddingVertical: 8,
    backgroundColor: COLORS.green,
    borderRadius: 15,
    flexGrow: 2,
    elevation: 15,
    shadowColor: COLORS.black80,
  },
  currentBalanceLabel: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.black60,
  },
  currentBalance: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: COLORS.black80,
  },
  predictedBalanceContainer: {
    alignItems: 'flex-start',
    paddingLeft: 24,
    paddingVertical: 8,
    backgroundColor: COLORS.black80,
    borderRadius: 15,
    flexGrow: 1,
    elevation: 15,
    shadowColor: COLORS.black80,
  },
  predictedBalance: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  predictedBalancelabel: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.black20,
  },
});
