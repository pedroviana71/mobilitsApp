import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {COLORS, FONTS} from '../../utils/styles';
import Icon from 'react-native-vector-icons/Feather';
import {useGetUserQuery} from '../../services/user';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';
import CurrencyInput from './Form/CurrencyInput';
import HorizontalSeparator from '../custom/HorizontalSeparator';

type RevenueProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Revenue'>;
};

const Revenue = ({navigation}: RevenueProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [currencyValue, setCurrencyValue] = useState('0,00');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
        <CurrencyInput
          currencyValue={currencyValue}
          handleCurrencyValue={setCurrencyValue}
          color={COLORS.green}
        />
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            placeholder="Digite o título"
            style={styles.textInput}
            value={title}
            onChange={e => setTitle(e.nativeEvent.text)}
            placeholderTextColor={COLORS.black20}
          />
        </View>
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            placeholder="Digite a descrição"
            style={[styles.textInput, {height: 96, textAlignVertical: 'top'}]}
            value={description}
            onChange={e => setDescription(e.nativeEvent.text)}
            placeholderTextColor={COLORS.black20}
          />
        </View>
        <HorizontalSeparator />
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
  inputs: {
    marginVertical: 16,
    gap: 8,
  },
  label: {
    fontFamily: FONTS.medium,
  },
  textInput: {
    fontFamily: FONTS.medium,
    borderRadius: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.black20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
});
