import React, {Dispatch, SetStateAction, useState} from 'react';
import {TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {priceMask} from '../../../utils/priceMask';
import {COLORS} from '../../../utils/styles';

interface CurrencyInputProps {
  currencyValue: string;
  color: string;
  handleCurrencyValue: Dispatch<SetStateAction<string>>;
}

const CurrencyInput = ({
  currencyValue,
  color,
  handleCurrencyValue,
}: CurrencyInputProps) => {
  const handleMonetaryValue = (value: string) => {
    handleCurrencyValue(priceMask(value));
  };

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.moneyMask}>R$ </Text>
      <TextInput
        placeholder="0,00"
        placeholderTextColor={color}
        style={styles.currencyInput}
        inputMode="numeric"
        onChangeText={handleMonetaryValue}
        value={currencyValue.toString().replace('.', ',')}
      />
    </View>
  );
};

export default CurrencyInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    elevation: 15,
    shadowColor: COLORS.black80,
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  moneyMask: {
    fontSize: 48,
    fontFamily: 'NotoSansMedium',
    color: COLORS.black80,
  },
  currencyInput: {
    height: 88,
    fontSize: 48,
    fontFamily: 'NotoSansMedium',
    color: COLORS.black80,
  },
});
