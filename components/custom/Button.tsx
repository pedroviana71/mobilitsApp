import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color: string;
  textColor?: string;
}

const AppButton = ({title, onPress, color, textColor}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: color},
        {borderColor: textColor},
      ]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
  text: {
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default AppButton;
