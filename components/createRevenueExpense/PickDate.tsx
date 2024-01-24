import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PickDate = () => {
  const [dateSelected, setDateSelected] = useState({
    today: true,
    yesterday: false,
    anotherDate: false,
  });

  const handleDate = (date: string) => {
    if (date === 'today') {
      setDateSelected({today: true, yesterday: false, anotherDate: false});
    }
    if (date === 'yesterday') {
      setDateSelected({today: false, yesterday: true, anotherDate: false});
    }
    if (date === 'anotherDate') {
      setDateSelected({today: false, yesterday: false, anotherDate: true});
    }
  };

  return (
    <View style={styles.inputs}>
      <Icon name="calendar-month" style={styles.icon} />
      <TouchableOpacity onPress={() => handleDate('today')}>
        <Text
          style={
            dateSelected.today ? styles.dateSelected : styles.dateNotSelected
          }>
          Hoje
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDate('yesterday')}>
        <Text
          style={
            dateSelected.yesterday
              ? styles.dateSelected
              : styles.dateNotSelected
          }>
          Ontem
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDate('anotherDate')}>
        <Text
          style={
            dateSelected.anotherDate
              ? styles.dateSelected
              : styles.dateNotSelected
          }>
          Outro dia
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dateSelected: {
    backgroundColor: '#5DB075',
    borderRadius: 8,
    marginHorizontal: 8,
    padding: 8,
  },
  dateNotSelected: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    marginHorizontal: 8,
    padding: 8,
  },
});
export default PickDate;
