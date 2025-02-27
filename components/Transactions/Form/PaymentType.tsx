import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../../utils/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PAYMENT_TYPES, PaymentType} from '../Revenue';

interface PaymentTypeProps {
  paymentType: PaymentType;
  setPaymentType: Dispatch<SetStateAction<PaymentType>>;
}

const PickPaymentType = ({paymentType, setPaymentType}: PaymentTypeProps) => {
  const handlePaymentType = (type: PaymentType) => {
    setPaymentType(type);
  };

  const isSingle = paymentType === PAYMENT_TYPES.SINGLE;

  const isRecurring = paymentType === PAYMENT_TYPES.RECURRING;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lançamento</Text>
      <View style={styles.paymentTypeContainer}>
        <TouchableOpacity
          style={[
            styles.paymentBox,
            isSingle && {
              backgroundColor: COLORS.black80,
            },
          ]}
          onPress={() => {
            handlePaymentType(PAYMENT_TYPES.SINGLE);
          }}>
          <Text
            style={[
              styles.paymentText,
              isSingle && {
                color: COLORS.white,
              },
            ]}>
            Único
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentBox,
            isRecurring && {backgroundColor: COLORS.black80},
          ]}
          onPress={() => {
            handlePaymentType(PAYMENT_TYPES.RECURRING);
          }}>
          <Text
            style={[
              styles.paymentText,
              isRecurring && {
                color: COLORS.white,
              },
            ]}>
            Recorrente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PickPaymentType;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 16,
    gap: 8,
  },
  label: {
    fontFamily: FONTS.medium,
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentBox: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLORS.black20,
  },
  paymentText: {
    color: COLORS.black80,
  },
});
