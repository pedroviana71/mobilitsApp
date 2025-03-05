import {Provider, useDispatch} from 'react-redux';
import {store} from './app/store';
import React, {useEffect, useState} from 'react';
import Home from './components/home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Welcome from './components/login/Welcome/Welcome';
import UserCredentials from './components/login/signUp/UserCredentials';
import Login from './components/login/signIn/Login';
import Revenue from './components/Transactions/Revenue';
import Profile from './components/profile/Profile';
import RecommendRegistration from './components/login/Welcome/RecommendRegistration';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Splash from './components/login/splash/Splash';
import MainLayout from './MainLayout';
import {COLORS} from './utils/styles';
import Menu from './components/home/Menu';
import AccountCreditCardManager from './components/accountAndCreditCards/AccountCreditCardManager';
import NewAccount from './components/accountAndCreditCards/NewAccount';
import NewCreditCard from './components/accountAndCreditCards/NewCreditCard';

export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Welcome: undefined;
  RecommendRegistration: undefined;
  UserCredentials: undefined;
  Login: undefined;
  Transactions: undefined;
  Profile: undefined;
  Splash: undefined;
  Revenue: undefined;
  AccountCreditCardManager: undefined;
  NewAccount: undefined;
  NewCreditCard: undefined;
};

type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              animation: 'none',
              statusBarStyle: 'dark',
              statusBarColor: COLORS.background,
            }}>
            <Stack.Screen name="Splash">
              {(props: ScreenProps<'Splash'>) => (
                <MainLayout showFooter={false}>
                  <Splash {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Home">
              {(props: ScreenProps<'Home'>) => (
                <MainLayout showFooter={true}>
                  <Home {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Menu">
              {(props: ScreenProps<'Menu'>) => (
                <MainLayout showFooter={false}>
                  <Menu {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="AccountCreditCardManager">
              {(props: ScreenProps<'AccountCreditCardManager'>) => (
                <MainLayout showFooter={false}>
                  <AccountCreditCardManager {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="NewAccount">
              {(props: ScreenProps<'NewAccount'>) => (
                <MainLayout showFooter={false}>
                  <NewAccount {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="NewCreditCard">
              {(props: ScreenProps<'NewCreditCard'>) => (
                <MainLayout showFooter={false}>
                  <NewCreditCard {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Welcome">
              {(props: ScreenProps<'Welcome'>) => (
                <MainLayout showFooter={false}>
                  <Welcome {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="RecommendRegistration">
              {(props: ScreenProps<'RecommendRegistration'>) => (
                <MainLayout showFooter={true}>
                  <RecommendRegistration {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {(props: ScreenProps<'Login'>) => (
                <MainLayout showFooter={false}>
                  <Login {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="UserCredentials">
              {(props: ScreenProps<'UserCredentials'>) => (
                <MainLayout showFooter={false}>
                  <UserCredentials {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Revenue">
              {(props: ScreenProps<'Revenue'>) => (
                <MainLayout showFooter={false}>
                  <Revenue {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props: ScreenProps<'Profile'>) => (
                <MainLayout showFooter={true}>
                  <Profile {...props} />
                </MainLayout>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
