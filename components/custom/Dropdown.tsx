import React, {RefObject, useRef, useState} from 'react';
import {FlatList, Modal, StyleSheet, TouchableOpacity} from 'react-native';
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
  const dropdownRef = useRef<TouchableOpacity>(null);
  const [dropdownTop, setDropdownTop] = useState(0);

  const handleShowDropdown = () => {
    dropdownRef.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(h + py);
    });
    setShowDropdown(!showDropdown);
  };

  const handleClickItem = (item: {name: string; id: number}) => {
    console.log(item);
    setShowDropdown(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleShowDropdown} ref={dropdownRef}>
        <View style={styles.labelContainer}>
          <Text>{label}</Text>
          <Icon name="arrow-drop-down" />
        </View>
      </TouchableOpacity>
      {showDropdown && (
        <Modal visible={showDropdown} transparent>
          <TouchableOpacity
            onPress={handleShowDropdown}
            style={styles.touchableContainer}>
            <Text style={{width: 100, height: 100, backgroundColor: 'blue'}}>
              oiiiii
            </Text>
            <FlatList
              style={
                (styles.dropdown,
                {
                  top: dropdownTop,
                  left: 50,
                  backgroundColor: 'red',
                  width: 200,
                  height: 200,
                })
              }
              data={mockData}
              renderItem={({item}) => (
                <Text onPress={() => handleClickItem(item)}>{item.name}</Text>
              )}
            />
          </TouchableOpacity>
        </Modal>
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
  },
  touchableContainer: {
    height: '100%',
  },
});

export default Dropdown;
