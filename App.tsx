import {Provider} from 'react-redux';
import {store} from './app/store';
import React from 'react';
import Home from './components/home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './components/login/Welcome/Welcome';
import UserCredentials from './components/login/signUp/UserCredentials';
import UserNames from './components/login/signUp/UserNames';
import AppCredentials from './components/login/signUp/AppCredentials';
import CarInformartions from './components/login/signUp/CarInformartions';
import Login from './components/login/signIn/Login';

export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  UserNames: undefined;
  AppCredentials: undefined;
  CarInformations: undefined;
  UserCredentials: undefined;
  Login: undefined;
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
          <Stack.Screen name="UserCredentials" component={UserCredentials} />
          <Stack.Screen name="UserNames" component={UserNames} />
          <Stack.Screen name="AppCredentials" component={AppCredentials} />
          <Stack.Screen name="CarInformations" component={CarInformartions} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
