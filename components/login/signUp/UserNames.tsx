import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AppButton from '../../custom/Button';
import {setUserFirstName, setUserLastName} from '../../../features/userSlice';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const UserNames = ({navigation}: UserCredentialsProps) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (name && lastName) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, lastName]);

  const dispatch = useDispatch();

  const handleName = (userName: string) => {
    setName(userName);
  };

  const handleLastName = (userLastName: string) => {
    setLastName(userLastName);
  };

  const handleSubmit = () => {
    if (!name || !lastName) {
      return;
    }

    dispatch(setUserFirstName(name));
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
          </View>
          <View>
            <Text style={styles.label}>Sobrenome</Text>
            <TextInput
              placeholder="Digite seu sobrenome"
              onChangeText={handleLastName}
              style={styles.input}
            />
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
