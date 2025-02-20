import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {COLORS, FONTS} from '../../utils/theme';
import Icon from 'react-native-vector-icons/Feather';
import {useGetUserQuery} from '../../services/user';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';

type RevenueProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Revenue'>;
};

const Revenue = ({navigation}: RevenueProps) => {
  const userId = useSelector((state: RootState) => state.user._id);
  const {data: user} = useGetUserQuery(userId);
  console.log(userId);

  const handlePickTransaction = () => {};

  const handlePickTitle = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.dropwdownContainer}>
        <Text style={styles.dropdownTitle}>{user?.name}, registre uma</Text>
        <Text style={styles.dropdownAction}>receita</Text>
        <Icon style={styles.dropdownIcon} name="chevron-down" size={16}></Icon>
      </View>
      <View style={styles.inputsContainer}>
        {/* <FormRevenueExpense isRevenue={isRevenue} navigation={navigation} /> */}
      </View>
    </View>
  );
};

export default Revenue;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    height: '100%',
  },
  dropwdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  inputsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingBottom: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
});
