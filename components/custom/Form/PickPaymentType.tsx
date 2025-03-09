import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../../utils/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PAYMENT_TYPES, PaymentType} from '../../Transactions/Revenue';

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

  const isInstallment = paymentType === PAYMENT_TYPES.INSTALLMENT;

  const paymentTypes = [
    {
      title: 'Único',
      typeCheck: isSingle,
      onPress: () => {
        handlePaymentType(PAYMENT_TYPES.SINGLE);
      },
    },
    {
      title: 'Recorrente',
      typeCheck: isRecurring,
      onPress: () => {
        handlePaymentType(PAYMENT_TYPES.RECURRING);
      },
    },
    {
      title: 'Parcelado',
      typeCheck: isInstallment,
      onPress: () => {
        handlePaymentType(PAYMENT_TYPES.INSTALLMENT);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lançamento</Text>
      <View style={styles.paymentTypeContainer}>
        {paymentTypes.map((payment, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paymentBox,
              payment.typeCheck && {
                backgroundColor: COLORS.black80,
              },
            ]}
            onPress={payment.onPress}>
            <Text
              style={[
                styles.paymentText,
                payment.typeCheck && {
                  color: COLORS.white,
                },
              ]}>
              {payment.title}
            </Text>
          </TouchableOpacity>
        ))}
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
