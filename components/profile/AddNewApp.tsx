import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import AppButton from '../custom/Button';
import {useCreateAppMutation} from '../../services/transportationApp';
import * as Keychain from 'react-native-keychain';

type UserCredentialsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserCredentials'>;
};

const AddNewApp = ({navigation}: UserCredentialsProps) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [appList, setAppList] = useState(['']);
  const [createApp] = useCreateAppMutation();

  const handleAppName = (value: string, index: number) => {
    const newInputFields = [...appList];
    newInputFields[index] = value;
    setAppList(newInputFields);
    setCanSubmit(true);
  };

  const addNewApp = () => {
    setAppList([...appList, '']);
  };

  const handleSubmit = async () => {
    const userId = await Keychain.getInternetCredentials('userId');

    if (!canSubmit || !userId) {
      return;
    }

    await createApp({
      userId: userId.password,
      name: appList,
    });

    navigation.goBack();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Informações extras</Text>
        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Qual aplicativo você usa?</Text>
          <Text>Exemplo: Uber, 99Pop, Indriver, Mercado Livre, etc</Text>
          {appList.map((app, index) => (
            <TextInput
              key={index}
              placeholder={`Aplicativo ${index + 1}`}
              value={app}
              onChangeText={value => handleAppName(value, index)}
              style={styles.input}
            />
          ))}
        </View>
        {appList.length <= 3 && (
          <AppButton
            onPress={addNewApp}
            title="Adicionar novo aplicativo"
            textColor="#5DB075"
            fontWeight="600"
            backgroundColor="#F6F6F6"
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={handleSubmit}
          title="Salvar"
          textColor="#E9ECED"
          backgroundColor={canSubmit ? '#5DB075' : '#90C59F'}
        />
        <AppButton
          onPress={handleGoBack}
          title="Cancelar"
          backgroundColor="#F6F6F6"
          textColor="#5DB075"
          fontWeight="600"
        />
      </View>
    </View>
  );
};

export default AddNewApp;

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
    marginBottom: 32,
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
