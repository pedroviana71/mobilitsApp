import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Calendar} from 'react-native-calendars';

interface PickDateProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}
interface dateCalendar {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

const PickDate = ({date, setDate}: PickDateProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateSelected, setDateSelected] = useState({
    today: true,
    yesterday: false,
    anotherDate: false,
  });

  const handleDate = (dateInput: string) => {
    if (dateInput === 'today') {
      setDateSelected({today: true, yesterday: false, anotherDate: false});
      setShowCalendar(false);
    }
    if (dateInput === 'yesterday') {
      setDateSelected({today: false, yesterday: true, anotherDate: false});
      setShowCalendar(false);
    }
    if (dateInput === 'anotherDate') {
      setDateSelected({today: false, yesterday: false, anotherDate: true});
      setShowCalendar(true);
    }
  };

  const handleOnDayPress = (day: dateCalendar) => {
    setShowCalendar(false);
    setDate(() => new Date(day.dateString));
  };

  return (
    <>
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
            {dateSelected.anotherDate && !showCalendar
              ? date.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
              : 'Outra data'}
          </Text>
        </TouchableOpacity>
      </View>

      {showCalendar && (
        <Calendar onDayPress={handleOnDayPress} hideDayNames={true} />
      )}
    </>
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
  calendarContainer: {
    backgroundColor: 'red',
    borderRadius: 8,
    position: 'absolute',
    width: '100%',
    height: '100%',
    // zIndex: 2,
  },
});
export default PickDate;
