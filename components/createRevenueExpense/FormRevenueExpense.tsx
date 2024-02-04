import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import HorizontalSeparator from '../custom/HorizontalSeparator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../custom/Button';
import PickDate from './PickDate';
import Dropdown from '../custom/Dropdown';
import {priceMask} from '../../utils/priceMask';
import {useGetUserQuery} from '../../services/user';
import * as Keychain from 'react-native-keychain';
import {DateTime} from 'luxon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

interface FormRevenueExpenseProps {
  isRevenue: boolean;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const FormRevenueExpense = ({
  isRevenue,
  navigation,
}: FormRevenueExpenseProps) => {
  const [monetaryValue, setMonetaryValue] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState(DateTime.now());
  const [app, setApp] = useState('');
  const [comments, setComments] = useState('');
  const {data: user} = useGetUserQuery(userId);

  useEffect(() => {
    const getUserId = async () => {
      const id = await Keychain.getInternetCredentials('userId');
      setUserId(id ? id.password : '');
    };
    getUserId();
  }, []);

  const handleMonetaryValue = (value: string) => {
    setMonetaryValue(priceMask(value));
  };

  const handleAddNewApp = () => {
    console.log('teste');
    console.log(navigation);
    navigation.navigate('AddApp');
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputs}>
          <Icon name="attach-money" style={styles.icon} />
          <TextInput
            placeholder="R$ 0,00"
            style={styles.moneyInput}
            inputMode="numeric"
            onChangeText={handleMonetaryValue}
            value={monetaryValue.replace('.', ',')}
          />
        </View>
        <HorizontalSeparator />
        <PickDate date={date} setDate={setDate} />
        <HorizontalSeparator />
        {isRevenue ? (
          <View style={styles.inputs}>
            <Icon name="description" style={styles.icon} />
            <Dropdown
              label="Selecionar o app"
              onClickItem={() => {}}
              onClickAddNewApp={handleAddNewApp} //! levar para uma tela de adicionar app a ser construida
              data={[]}
            />
          </View>
        ) : (
          <View style={styles.inputs}>
            <Icon name="description" style={styles.icon} />
            <TextInput placeholder="Selecione a despesa" />
          </View>
        )}
        <HorizontalSeparator />
        <View style={styles.inputs}>
          <Icon name="comment" style={styles.icon} />
          <TextInput
            placeholder="Comentários (opcional)"
            style={styles.comments}
            value={comments}
            onChange={e => setComments(e.nativeEvent.text)}
          />
        </View>
      </View>
      <AppButton title="Salvar" onPress={() => {}} backgroundColor="green" />
    </View>
  );
};

export default FormRevenueExpense;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 24,
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  moneyInput: {
    fontSize: 30,
    color: '#4B9460',
  },
  comments: {
    padding: 8,
    marginLeft: 8,
    width: '90%',
    borderRadius: 8,
    borderColor: '#E8E8E8',
    height: 50,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    fontSize: 18,
  },
});
