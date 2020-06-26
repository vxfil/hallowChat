import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { MainScreen } from '../screens/MainScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { ForgotPassword } from '../screens/ForgotPassword';
import { ChatScreen } from '../screens/ChatScreen';
import { THEME } from '../theme';
import { MainDrawer } from './MainDrawer';

const Stack = createStackNavigator();

const LogoTitle = () => {
  return (
    <Image style={styles.logo} source={require('../../assets/logo11.png')} />
  );
};

const DefaultAvatar = () => {
  return (
    <Image style={styles.avatar} source={require('../../assets/avatar1.png')} />
  );
};

export const AppNavigation = () => {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <NavigationContainer>
      {!isAuth ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: THEME.MAIN_COLOR,
            },
            headerTintColor: '#FFF',
          }}
        >
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="Forgot"
            component={ForgotPassword}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: THEME.MAIN_COLOR,
            },
            headerTintColor: '#FFF',
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={MainDrawer}
            options={({ navigation }) => ({
              headerTitle: (props) => <LogoTitle {...props} />,
              headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                  <Item
                    title="options"
                    iconName="menu"
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                  />
                </HeaderButtons>
              ),
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                  <Item
                    title="favorite"
                    iconName="star"
                    onPress={() => console.log('favorite pressed')}
                  />
                  <Item
                    title="find"
                    iconName="search"
                    onPress={() => console.log('search pressed')}
                  />
                </HeaderButtons>
              ),
            })}
          />
          <Stack.Screen
            name="ChatPage"
            component={ChatScreen}
            options={{
              headerTitle: (props) => <DefaultAvatar {...props} />,
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                  <Item
                    title="favorite"
                    iconName="star"
                    onPress={() => console.log('favorite pressed')}
                  />
                  <Item
                    title="find"
                    iconName="search"
                    onPress={() => console.log('search pressed')}
                  />
                </HeaderButtons>
              ),
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 117,
    height: 25,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});
