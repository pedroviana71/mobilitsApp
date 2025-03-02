import React, {Dispatch, SetStateAction, useState} from 'react';
import {TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {priceMask} from '../../../utils/priceMask';
import {COLORS} from '../../../utils/styles';

interface CurrencyInputProps {
  value: number;
  color: string;
  handleInputChange: Dispatch<SetStateAction<number>>;
}

const CurrencyInput = ({
  value,
  color,
  handleInputChange,
}: CurrencyInputProps) => {
  const [maskedValue, setMaskedValue] = useState('0,00');

  const handleMonetaryValue = (inputValue: string) => {
    const realValue = Number(priceMask(inputValue).replace(',', '.'));
    setMaskedValue(priceMask(inputValue));
    handleInputChange(realValue);
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
        value={maskedValue}
        maxLength={10}
        autoFocus
      />
    </View>
  );
};

export default CurrencyInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
