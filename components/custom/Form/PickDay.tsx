import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {DateTime} from 'luxon';
import {COLORS, FONTS} from '../../../utils/styles';
interface PickDateProps {
  date?: DateTime | null;
  setDate: Dispatch<SetStateAction<DateTime | null>>;
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

const PickDate = ({date, setDate, backgroundColor, label}: PickDateProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateFromCalendar = (calendarDate: dateCalendar) => {
    setDate(() => DateTime.fromISO(calendarDate.dateString));
    setShowCalendar(false);
  };

  return (
    <>
      <View style={styles.inputs}>
        <Text style={styles.label}>{label ? label : 'Data'}</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Text
              style={[
                styles.dateBox,
                {
                  backgroundColor: date
                    ? backgroundColor
                    : backgroundColor + '20',
                },
              ]}>
              {date && !showCalendar
                ? 'Dia ' + date.toFormat('dd')
                : 'Escolha a data'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showCalendar && (
        <Calendar
          onDayPress={handleDateFromCalendar}
          hideDayNames={true}
          initialDate={date ? date.toISODate() : DateTime.now().toISODate()}
          style={styles.calendarContainer}
          hideExtraDays={true}
          disableMonthChange={true}
          hideArrows={true}
          customHeader={() => null}
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

export default React.memo(PickDate);
