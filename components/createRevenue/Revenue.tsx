import React from 'react';
import {Text, TextInput, View} from 'react-native';
import HorizontalSeparator from '../custom/HorizontalSeparator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../custom/Button';

const Revenue = () => {
  return (
    <>
      <Text>Adicionar Receita</Text>
      <View>
        <Icon name="attach-money" />
        <TextInput placeholder="Valor" />
      </View>
      <HorizontalSeparator />
      <View>
        <Icon name="calendar-month" />
        <TextInput placeholder="Data" />
      </View>
      <HorizontalSeparator />
      <View>
        <Icon name="description" />
        <TextInput placeholder="Selecione o app" />
      </View>
      <HorizontalSeparator />
      <View>
        <Icon name="comment" />
        <TextInput placeholder="Comentários" />
      </View>
      <AppButton title="Salvar" onPress={() => {}} backgroundColor="green" />
    </>
  );
};

export default Revenue;
