import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Post from './app/components/post';
import Login from './app/screens/login';
import Signup from './app/screens/signup';
import Home from './app/screens/home';

//Declaring Stack Navigator to Setup Navigation for the Application
const Stack = createStackNavigator();

const App = () => {
  //Setting up all the Routes for all the Screens
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: 'Signup'}}
        />
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen name="Post" component={Post} options={{title: 'Post'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
