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
import PickDay from '../custom/Form/PickDay';
import {DateTime} from 'luxon';
import {useCreateCreditCardMutation} from '../../services/creditcard';
import {ICreateCreditCard} from '../../types/creditCard.types';

type NewCreditCardProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewCreditCard'>;
};

const NewCreditCard = ({navigation}: NewCreditCardProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [limit, setLimit] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [dueDate, setDueDate] = useState<DateTime | null>(null);
  const [closingDate, setClosingDate] = useState<DateTime | null>(null);

  const [createCreditCard] = useCreateCreditCardMutation();

  const handleCreateCreditCard = async () => {
    const creditCard: ICreateCreditCard = {
      userId: user._id,
      limit,
      name,
      color,
      dueDay: dueDate ? dueDate.day : DateTime.now().day,
      closingDay: closingDate ? closingDate.day : DateTime.now().day,
    };
    console.log(creditCard);

    const creditCardResponse = await createCreditCard(creditCard);

    if ('error' in creditCardResponse) {
      console.log(creditCardResponse.error);
      return;
    }

    navigation.navigate('AccountCreditCardManager');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        preText="adicione um"
        actionText="cartão de crédito"
        justifyContent="center"
      />
      <View style={styles.inputsContainer}>
        <View>
          <Text style={styles.label}>Limite do cartão:</Text>
          <CurrencyInput color={COLORS.green} handleInputChange={setLimit} />
          <View style={styles.inputs}>
            <Text style={styles.label}>Nome do cartão</Text>
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
          <PickDay
            date={closingDate}
            setDate={setClosingDate}
            backgroundColor={COLORS.black20}
            label="Dia do fechamento"
          />
          <PickDay
            date={dueDate}
            setDate={setDueDate}
            backgroundColor={COLORS.black20}
            label="Dia de vencimento"
          />
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Salvar"
              backgroundColor={COLORS.green}
              textColor={COLORS.black80}
              onPress={handleCreateCreditCard}
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

export default NewCreditCard;

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
  picker: {
    // padding: 0,
    // margin: 0,
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
