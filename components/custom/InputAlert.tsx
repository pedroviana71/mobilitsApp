import React from 'react';
import {StyleSheet, Text} from 'react-native';

type IInputAlertProps = {
  text: string;
};

const InputAlert = ({text}: IInputAlertProps) => {
  return (
    <>
      <Text style={styles.passwordAlert}>{text}</Text>
    </>
  );
};
const styles = StyleSheet.create({
  passwordAlert: {
    color: '#EC5B5B',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 4,
  },
});
export default InputAlert;
