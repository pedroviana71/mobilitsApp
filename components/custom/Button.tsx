import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  textColor?: string;
  fontWeight?: 'bold' | 'normal' | '300' | '600' | '900';
  width?: string;
  elevation?: number;
  shadowColor?: string;
  fontSize?: number;
}

const AppButton = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  fontWeight,
  width,
  elevation,
  shadowColor,
  fontSize,
}: ButtonProps) => {
  const fontSizeNumber = fontSize ? fontSize : 16;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor, width, elevation, shadowColor},
      ]}>
      <Text
        style={[
          styles.text,
          {color: textColor, fontWeight, fontSize: fontSizeNumber},
        ]}>
        {title}
      </Text>
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
