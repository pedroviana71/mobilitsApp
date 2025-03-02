import React, {useState} from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {COLORS, FONTS} from '../../../utils/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const formColors = {
  GREEN: '#00AC45',
  BLUE: '#3C56FF',
  PURPLE: '#AB34FF',
  ORANGE: '#FF9C45',
  YELLOW: '#FFCE48',
  BLACK: '#474747',
  CIAN: '#00D7CC',
  RED: '#FF5555',
  PINK: '#FF4A9B',
} as const;

interface ColorSelectorProps {
  label: string;
  handleColorChange: (color: Color) => void;
}

type Color = (typeof formColors)[keyof typeof formColors];

const ColorSelector = ({label, handleColorChange}: ColorSelectorProps) => {
  const [formSelectedColor, setFormSelectedColor] = useState<Color | ''>('');

  const handleColor = (color: Color) => {
    handleColorChange(color);
    setFormSelectedColor(color);
  };

  const handleBackgroundColor = (color: Color) => {
    if (!formSelectedColor) {
      return color;
    }

    if (formSelectedColor === color) {
      return color;
    }

    return color + '40';
  };

  return (
    <View style={styles.inputs}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.circleContainer}>
        {Object.values(formColors).map((color, index) => (
          <TouchableOpacity
            onPress={() => handleColor(color)}
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: handleBackgroundColor(color),
                borderColor: COLORS.black80,
                borderWidth: formSelectedColor === color ? 1 : 0,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ColorSelector;

const styles = StyleSheet.create({
  inputs: {
    marginVertical: 16,
    gap: 8,
  },
  label: {
    fontFamily: FONTS.medium,
  },
  circleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
