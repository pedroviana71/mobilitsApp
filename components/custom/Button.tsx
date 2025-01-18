import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: 'bold' | 'normal' | '300' | '400' | '500' | '600' | '900';
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
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[
      styles.container,
      {backgroundColor, width, elevation, shadowColor},
    ]}>
      <View>
        <Text
          style={[
            styles.text,
            {color: textColor, fontWeight, fontSize: fontSizeNumber},
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    marginVertical: 16,
    fontFamily: 'NotoSansMedium',
  },
});

export default AppButton;
