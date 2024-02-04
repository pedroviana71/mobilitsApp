import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Calendar} from 'react-native-calendars';
import {DateTime} from 'luxon';
interface PickDateProps {
  date: DateTime;
  setDate: Dispatch<SetStateAction<DateTime>>;
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
  const today = DateTime.now();
  console.log(date, 'date');

  const handleOnDayPress = (date: dateCalendar) => {
    setDate(() => DateTime.fromISO(date.dateString));
    setShowCalendar(false);
  };

  const handleChangeDate = (date: DateTime, showCalendar: boolean) => {
    setDate(date);
    setShowCalendar(showCalendar);
  };

  const isOtherDate =
    date.toISODate() !== today.toISODate() &&
    date.toISODate() !== today.minus({days: 1}).toISODate();

  return (
    <>
      <View style={styles.inputs}>
        <Icon name="calendar-month" style={styles.icon} />
        <TouchableOpacity onPress={() => handleChangeDate(today, false)}>
          <Text
            style={
              date.toISODate() === today.toISODate()
                ? styles.dateSelected
                : styles.dateNotSelected
            }>
            Hoje
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChangeDate(today.minus({days: 1}), false)}>
          <Text
            style={
              date.toISODate() === today.minus({days: 1}).toISODate()
                ? styles.dateSelected
                : styles.dateNotSelected
            }>
            Ontem
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChangeDate(today.minus({days: 1000}), true)}>
          <Text
            style={isOtherDate ? styles.dateSelected : styles.dateNotSelected}>
            {isOtherDate && !showCalendar
              ? date.toLocaleString()
              : 'Outra data'}
          </Text>
        </TouchableOpacity>
      </View>

      {showCalendar && (
        <Calendar
          onDayPress={handleOnDayPress}
          hideDayNames={true}
          initialDate={today.toISODate()}
        />
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
  },
});
export default PickDate;
