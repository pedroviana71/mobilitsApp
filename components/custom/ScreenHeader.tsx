import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS} from '../../utils/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {capitalizeFirstLetter} from '../../utils/CapitilizeLetter';

interface Props {
  preText: string;
  actionText: string;
  backgroundColor?: string;
  justifyContent: 'flex-start' | 'center' | 'flex-end';
}

const ScreenHeader = ({
  preText,
  actionText,
  backgroundColor,
  justifyContent,
}: Props) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <View
      style={[
        styles.dropwdownContainer,
        {backgroundColor: backgroundColor || COLORS.background, justifyContent},
      ]}>
      {user?.name ? (
        <Text style={styles.dropdownTitle}>
          {user?.name}, {preText}
        </Text>
      ) : (
        <Text style={styles.dropdownTitle}>
          {capitalizeFirstLetter(preText)}
        </Text>
      )}
      <Text style={styles.dropdownAction}>{actionText}</Text>
      {/* <Icon style={styles.dropdownIcon} name="chevron-down" size={16} /> */}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  dropwdownContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  dropdownTitle: {
    fontSize: 16,
    fontFamily: FONTS.light,
    marginLeft: 16,
    color: COLORS.black60,
  },
  dropdownAction: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    paddingHorizontal: 4,
    color: COLORS.black80,
  },
  dropdownIcon: {
    paddingLeft: 10,
    color: COLORS.black60,
  },
});
