import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface DropdownProps {
  label: string;
}
const mockData = [
  {
    id: 1,
    name: 'Uber',
  },
  {
    id: 2,
    name: '99',
  },
  {
    id: 3,
    name: 'Mercado Livre',
  },
];

const Dropdown = ({label}: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleShowDropdown}>
        <View style={styles.labelContainer}>
          <Text>{label}</Text>
          <Icon name="arrow-drop-down" />
        </View>
      </TouchableOpacity>
      {showDropdown && (
        <FlatList
          style={styles.dropdown}
          data={mockData}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 20,
    left: 8,
  },
});
export default Dropdown;
