import React, {useState} from 'react';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import CurrencyInput from '../custom/Form/CurrencyInput';
import {COLORS, FONTS} from '../../utils/styles';
import ScreenHeader from '../custom/ScreenHeader';
import ColorSelector from '../custom/Form/ColorSelector';
import AppButton from '../custom/Button';
import {useCreateAccountMutation} from '../../services/account';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

type NewAccountProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewAccount'>;
};

const NewAccount = ({navigation}: NewAccountProps) => {
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const user = useSelector((state: RootState) => state.user);

  const [createAccount] = useCreateAccountMutation();

  const handleCreateAccount = async () => {
    const account = {
      userId: user._id,
      balance,
      name,
      color,
    };
    const acccountResponse = await createAccount(account);

    if ('error' in acccountResponse) {
      console.log(acccountResponse.error);
      return;
    }

    navigation.navigate('AccountCreditCardManager');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        preText="adicione uma"
        actionText="conta corrente"
        justifyContent="center"
      />
      <View style={styles.inputsContainer}>
        <View>
          <Text style={styles.label}>Dinheiro na conta:</Text>
          <CurrencyInput
            value={balance}
            color={COLORS.green}
            handleInputChange={setBalance}
          />
          <View style={styles.inputs}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              placeholder="Digite o nome"
              style={styles.textInput}
              value={name}
              onChange={e => setName(e.nativeEvent.text)}
              placeholderTextColor={COLORS.black20}
              maxLength={55}
            />
          </View>
          <ColorSelector
            label="Selecione uma cor"
            handleColorChange={setColor}
          />
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Salvar"
              backgroundColor={COLORS.green}
              textColor={COLORS.black80}
              onPress={handleCreateAccount}
              shadowColor={COLORS.black20}
              elevation={10}
            />
            <AppButton
              title="Cancelar"
              backgroundColor={COLORS.white}
              textColor={COLORS.black80}
              onPress={() => navigation.navigate('AccountCreditCardManager')}
              shadowColor={COLORS.black20}
              elevation={10}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewAccount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  inputsContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  label: {
    fontFamily: FONTS.medium,
  },
  inputs: {
    marginVertical: 16,
    gap: 8,
  },
  textInput: {
    fontFamily: FONTS.medium,
    borderRadius: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.black20,
  },
  buttonContainer: {
    gap: 16,
  },
});
