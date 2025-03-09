import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Dropdown from '../Dropdown';
import {COLORS, FONTS} from '../../../utils/styles';
import Icon from 'react-native-vector-icons/Feather';
import {Pressable} from 'react-native';
import {FlatList} from 'react-native';

interface ISelectList {
  selectedItem: {name: string; _id: string} | '';
  handleInputItem:
    | Dispatch<SetStateAction<{name: string; _id: string} | ''>>
    | ((arg0: any) => void);
  data: {name: string; _id: string}[];
  label: string;
}

const MenuDropdown = ({
  selectedItem,
  handleInputItem,
  data,
  label,
}: ISelectList) => {
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const dropdownRef = useRef<TouchableOpacity>(null);

  const handleClickItem = (item: {name: string; _id: string}) => {
    setVisible(false);
    handleInputItem(item);
  };

  const openDropdown = () => {
    dropdownRef.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(_prev => py + h);
      setVisible(true);
    });
  };

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={styles.input}
        ref={dropdownRef}>
        <Text style={[styles.label, !selectedItem ? styles.unselected : null]}>
          {selectedItem ? selectedItem.name : label}
        </Text>
        <Icon style={styles.icon} name="chevron-down" />
      </TouchableOpacity>
      <View>
        <Modal visible={visible} transparent>
          <Pressable
            onPress={() => setVisible(false)}
            style={styles.touchableContainer}>
            <FlatList
              scrollEnabled
              style={[
                styles.dropdown,
                {
                  top: dropdownTop,
                  left: 0,
                },
              ]}
              data={data}
              renderItem={({item}) => (
                <Text onPress={() => handleClickItem(item)} style={styles.text}>
                  {item.name}
                </Text>
              )}
            />
          </Pressable>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.black20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 16,
  },
  icon: {
    fontSize: 24,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  text: {
    fontFamily: FONTS.light,
    fontSize: 20,
    paddingVertical: 8,
    color: COLORS.black80,
  },
  unselected: {
    color: COLORS.black20,
  },
  dropdown: {
    width: '90%',
    marginTop: 16,
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: COLORS.black60,
    elevation: 10,
    paddingLeft: 16,
    marginHorizontal: 16,
    maxHeight: 150,
  },
  touchableContainer: {
    height: '100%',
  },
});

export default MenuDropdown;
