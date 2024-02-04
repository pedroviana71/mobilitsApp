import {Provider} from 'react-redux';
import {store} from './app/store';
import React from 'react';
import Home from './components/home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './components/login/Welcome/Welcome';
import UserCredentials from './components/login/signUp/UserCredentials';
import UserNames from './components/login/signUp/UserNames';
import AppInformations from './components/login/signUp/AppInformations';
import CarInformartions from './components/login/signUp/CarInformartions';
import Login from './components/login/signIn/Login';
import CreateRevenueExpense from './components/createRevenueExpense/CreateRevenueExpense';
import AddNewApp from './components/profile/AddNewApp';

export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  UserNames: undefined;
  AppInformations: undefined;
  CarInformations: undefined;
  UserCredentials: undefined;
  Login: undefined;
  Revenue: undefined;
  AddApp: undefined;
};

function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserCredentials" component={UserCredentials} />
          <Stack.Screen name="UserNames" component={UserNames} />
          <Stack.Screen name="CarInformations" component={CarInformartions} />
          <Stack.Screen name="AppInformations" component={AppInformations} />
          <Stack.Screen name="Revenue" component={CreateRevenueExpense} />
          <Stack.Screen name="AddApp" component={AddNewApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
