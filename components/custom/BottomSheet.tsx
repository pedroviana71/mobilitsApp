import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const BottomSheet = ({children}: Props) => {
  return (
    <>
      <Text>BottomSheet</Text>
      <Text>BottomSheet</Text>
      <Text>BottomSheet</Text>
      <Text>BottomSheet</Text>

      {children}
    </>
  );
};

export default BottomSheet;
