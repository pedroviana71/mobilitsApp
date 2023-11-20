import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Earnings = () => {
  return (
    <View>
      <View>
        <Text>Semana</Text>
        <Icon name="keyboard-arrow-down" />
      </View>
      <View>
        <View>
          <View>
            <Icon name="arrow-upward" />
            <View>
              <Text>Receitas</Text>
              <Text>R$ 0,00</Text>
            </View>
          </View>
          <View>
            <Icon name="arrow-downward" />
            <View>
              <Text>Receitas</Text>
              <Text>R$ 0,00</Text>
            </View>
          </View>
        </View>
        <View>
          <Text>Meta</Text>
          <Text>R$ 245,00</Text>
        </View>
      </View>
    </View>
  );
};

export default Earnings;
