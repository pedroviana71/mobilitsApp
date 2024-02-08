import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';
import CheckBox from '@react-native-community/checkbox';
import {
  setIsUserCarRented,
  setUserCarRentPrice,
} from '../../../features/userSlice';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const CarInformations = ({navigation}: UserCredentialsProps) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [isCarRented, setIsCarRented] = useState(false);
  const [isOwnCar, setIsOwnCar] = useState(false);
  const [rentPrice, setRentPrice] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (rentPrice !== '0' || isOwnCar) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [isOwnCar, rentPrice]);

  const handleRentValue = (value: string) => {
    const number = parseFloat(value.replace(/[^\d]/g, ''));

    const money = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(number / 100);

    setRentPrice(money);
  };

  const handleOwnCar = (value: boolean) => {
    setIsOwnCar(value);
    if (isCarRented) {
      setIsCarRented(false);
    }
  };

  const handleCarRented = (value: boolean) => {
    setIsCarRented(value);
    setRentPrice('0');
    if (isOwnCar) {
      setIsOwnCar(false);
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    dispatch(setIsUserCarRented(isCarRented));

    if (!isOwnCar) {
      const rent = parseFloat(rentPrice.replace(/[^\d,]/g, '')).toFixed(2);
      dispatch(setUserCarRentPrice(Number(rent)));
    }

    navigation.navigate('AppInformations');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Informações extras</Text>
        <View style={styles.inputsContainer}>
          <View>
            <Text style={styles.label}>O carro que voce usa é alugado?</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isCarRented} onValueChange={handleCarRented} />
              <Text>Carro alugado</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isOwnCar} onValueChange={handleOwnCar} />
              <Text>Carro próprio</Text>
            </View>
          </View>
          {isCarRented ? (
            <View>
              <Text style={styles.label}>
                Qual o valor do aluguel do carro mensal?
              </Text>
              <TextInput
                placeholder="Valor do aluguel"
                value={rentPrice}
                onChangeText={handleRentValue}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={handleSubmit}
          title="Próximo"
          textColor="#E9ECED"
          backgroundColor={canSubmit ? '#5DB075' : '#90C59F'}
        />
        <AppButton
          onPress={handleGoBack}
          title="Voltar"
          backgroundColor="#F6F6F6"
          textColor="#5DB075"
          fontWeight="600"
        />
      </View>
    </View>
  );
};

export default CarInformations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#E9ECED',
    justifyContent: 'space-between',
  },
  inputsContainer: {
    gap: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#4B9460',
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    paddingLeft: 8,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
});
