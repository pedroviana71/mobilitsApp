import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';
import {setUserName, setUserLastName} from '../../../features/userSlice';
import {nameLengthValidation} from '../../../utils/formValidations/nameLengthValidation';
import InputAlert from '../../custom/InputAlert';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const UserNames = ({navigation}: UserCredentialsProps) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  useEffect(() => {
    if (name && lastName) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, lastName]);

  const dispatch = useDispatch();

  const handleName = (userName: string) => {
    setIsNameValid(true);
    setName(userName);
  };

  const handleLastName = (userLastName: string) => {
    setIsLastNameValid(true);
    setLastName(userLastName);
  };

  const handleSubmit = () => {
    const isName = nameLengthValidation(name);
    const isLastName = nameLengthValidation(lastName);

    if (!name || !lastName) {
      return;
    }

    if (!isName) {
      setIsNameValid(false);
      return;
    }

    if (!isLastName) {
      setIsLastNameValid(false);
      return;
    }

    dispatch(setUserName(name));
    dispatch(setUserLastName(lastName));
    navigation.navigate('CarInformations');
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
            <Text style={styles.label}>Nome</Text>
            <TextInput
              placeholder="Digite seu nome"
              onChangeText={handleName}
              style={styles.input}
            />
            {!isNameValid && (
              <InputAlert text="Nome precisa no mínimo duas letras e no máximo 50 letras!" />
            )}
          </View>
          <View>
            <Text style={styles.label}>Sobrenome</Text>
            <TextInput
              placeholder="Digite seu sobrenome"
              onChangeText={handleLastName}
              style={styles.input}
            />
            {!isLastNameValid && (
              <InputAlert text="Sobrenome precisa no mínimo duas letras e no máximo 50 letras!" />
            )}
          </View>
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

export default UserNames;

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
