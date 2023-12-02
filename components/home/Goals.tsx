import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Goals = () => {
  return (
    <>
      <Text style={styles.titleContainer}>Metas pessoais</Text>
      <View style={styles.container}>
        <View style={styles.goalsContainer}>
          <Text>Decimo Terceiro: </Text>
          <Text style={styles.earningText}>R$ 245,00</Text>
        </View>
        <Icon style={styles.icon} name="calendar-month" />
      </View>
    </>
  );
};

export default Goals;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000000',
    elevation: 5,
  },
  goalsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  earningText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B9460',
  },
  icon: {
    fontSize: 30,
  },
});
