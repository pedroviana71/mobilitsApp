import React, {useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface DropdownProps {
  label: string;
  data: {name: string; id: number}[];
  onClickItem: (item: {name: string; id: number}) => void;
  onClickAddNewApp: () => void;
}

const Dropdown = ({
  label,
  data,
  onClickItem,
  onClickAddNewApp,
}: DropdownProps) => {
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
    setShowDropdown(false);
    if (item.name === 'Adicionar Item') {
      onClickAddNewApp();
      return;
    }
    onClickItem(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShowDropdown} ref={dropdownRef}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Icon name="arrow-drop-down" />
        </View>
      </TouchableOpacity>
      {showDropdown && (
        <Modal visible={showDropdown} transparent>
          <Pressable
            onPress={handleShowDropdown}
            style={styles.touchableContainer}>
            <FlatList
              style={[
                styles.dropdown,
                {
                  top: dropdownTop,
                  left: 50,
                },
              ]}
              data={data.length > 0 ? data : [{name: 'Adicionar Item', id: 0}]}
              renderItem={({item}) => (
                <Text onPress={() => handleClickItem(item)} style={styles.text}>
                  {item.name}
                </Text>
              )}
            />
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    width: '100%',
  },
  label: {
    fontSize: 18,
  },
  dropdown: {
    marginTop: 8,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 3,
    padding: 8,
  },
  touchableContainer: {
    height: '100%',
  },
  text: {
    fontSize: 18,
    paddingVertical: 8,
  },
});

export default Dropdown;
