import React, {Dispatch, SetStateAction} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dropdown from '../../custom/Dropdown';
import {User} from '../../../types/user.types';
import {TouchableNativeFeedback} from 'react-native';

interface ISelectList {
  selectedApp: string;
  label: string;
  onClickItem: (item: {name: string; _id: string}) => void;
  handleAddNewApp: () => void;
  setSelectedApp: Dispatch<SetStateAction<{name: string; _id: string}>>;
  data: {name: string; _id: string}[];
}

const SelectList = ({
  selectedApp,
  onClickItem,
  handleAddNewApp,
  setSelectedApp,
  label,
  data,
}: ISelectList) => {
  const handleDeleteSelection = () => {
    setSelectedApp({name: '', _id: ''});
  };

  return (
    <View style={styles.inputs}>
      <Icon name="description" style={styles.icon} />
      {selectedApp ? (
        <TouchableOpacity
          onPress={handleDeleteSelection}
          style={styles.appSelected}>
          <View style={styles.appSelected}>
            <Text style={styles.appTextSelected}>{selectedApp}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Dropdown
          label={label}
          onClickItem={onClickItem}
          onClickAddNewApp={handleAddNewApp}
          data={data ?? []}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  icon: {
    fontSize: 24,
  },
  appTextSelected: {
    fontSize: 18,
  },
  appSelected: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 36,
  },
});

export default SelectList;
