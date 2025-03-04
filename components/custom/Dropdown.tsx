import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../utils/styles';

interface DropdownProps {
  data: {name: string; _id: string}[];
  handleInputItem: (item: {name: string; _id: string}) => void;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown = ({
  data,
  handleInputItem,
  showDropdown,
  setShowDropdown,
}: DropdownProps) => {
  const [dropdownTop, setDropdownTop] = useState(0);
  const dropdownRef = useRef<View>(null);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickItem = (item: {name: string; _id: string}) => {
    setShowDropdown(false);

    handleInputItem(item);
  };

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      dropdownRef.current.measure((_fx, _fy, _width, height, _px, py) => {
        setDropdownTop(py + height);
      });
    }
  }, [showDropdown]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShowDropdown}>
        <View ref={dropdownRef}></View>
      </TouchableOpacity>
      <Modal visible={showDropdown} transparent style={styles.container}>
        <Pressable
          onPress={handleShowDropdown}
          style={styles.touchableContainer}>
          <FlatList
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    width: '90%',
    marginTop: 16,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: COLORS.black60,
    elevation: 10,
    paddingLeft: 16,
    marginHorizontal: 16,
  },
  touchableContainer: {
    height: '100%',
  },
  text: {
    fontSize: 18,
    color: COLORS.black80,
    paddingVertical: 12,
  },
});

export default Dropdown;
