import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Footer from './components/custom/Footer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';

interface FooterProps {
  children: ReactNode;
  showFooter: boolean;
}

const MainLayout = ({children, showFooter}: FooterProps) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>{children}</View>
      {showFooter && <Footer />}
    </View>
  );
};

export default MainLayout;
