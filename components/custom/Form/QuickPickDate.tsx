import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {DateTime} from 'luxon';
import {COLORS, FONTS} from '../../../utils/styles';
interface PickDateProps {
  date: DateTime;
  setDate: Dispatch<SetStateAction<DateTime>>;
  backgroundColor: string;
  label?: string;
}
interface dateCalendar {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

const QuickPickDate = ({
  date,
  setDate,
  backgroundColor,
  label,
}: PickDateProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const today = DateTime.now();
  const yesterday = today.minus({days: 1});
  const isOtherDate =
    date.toISODate() !== today.toISODate() &&
    date.toISODate() !== today.minus({days: 1}).toISODate();

  const handleDateFromCalendar = (calendarDate: dateCalendar) => {
    setDate(() => DateTime.fromISO(calendarDate.dateString));
    setShowCalendar(false);
  };

  const handleChangeDate = (newDate: DateTime, showCalendar: boolean) => {
    setDate(newDate);
    setShowCalendar(showCalendar);
  };

  return (
    <>
      <View style={styles.inputs}>
        <Text style={styles.label}>{label ? label : 'Data'}</Text>
        <View style={styles.dateContainer}>
          <View style={styles.dateContainer}>
            <TouchableOpacity
              onPress={() => handleChangeDate(DateTime.now(), false)}>
              <Text
                style={[
                  styles.dateBox,
                  {
                    backgroundColor:
                      today.toISODate() === date.toISODate()
                        ? backgroundColor
                        : backgroundColor + '20',
                  },
                ]}>
                Hoje
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleChangeDate(DateTime.now().minus({days: 1}), false)
              }>
              <Text
                style={[
                  styles.dateBox,
                  {
                    backgroundColor:
                      yesterday.toISODate() === date.toISODate()
                        ? backgroundColor
                        : backgroundColor + '20',
                  },
                ]}>
                Ontem
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Text
              style={[
                styles.dateBox,
                {
                  backgroundColor: isOtherDate
                    ? backgroundColor
                    : backgroundColor + '20',
                },
              ]}>
              {isOtherDate && !showCalendar
                ? date.toLocaleString()
                : 'Escolha a data'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showCalendar && (
        <Calendar
          onDayPress={handleDateFromCalendar}
          hideDayNames={true}
          initialDate={today.toISODate()}
          style={[styles.calendarContainer, {opacity: showCalendar ? 1 : 0}]}
          hideExtraDays={true}
          // enableSwipeMonths={true}
          hideArrows={true}
          theme={{
            textSectionTitleDisabledColor: COLORS.black80,
            todayTextColor: COLORS.green,
            dayTextColor: COLORS.black60,
            arrowColor: COLORS.black80,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    paddingVertical: 16,
    gap: 8,
  },
  label: {
    fontFamily: FONTS.medium,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    borderRadius: 8,
    marginHorizontal: 8,
    padding: 8,
    color: COLORS.black80,
  },
  calendarContainer: {
    borderRadius: 15,
    width: '100%',
    elevation: 15,
    shadowColor: COLORS.black80,
  },
});

export default React.memo(QuickPickDate);
