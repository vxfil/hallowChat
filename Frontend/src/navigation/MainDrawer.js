import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChatsScreen } from '../screens/ChatsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { GroupScreen } from '../screens/GroupScreen';
import { ContactsScreen } from '../screens/ContactsScreen';

const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Chats">
      <Drawer.Screen name="Chats" component={ChatsScreen} />
      <Drawer.Screen name="Contacts" component={ContactsScreen} />
      <Drawer.Screen name="Create Group" component={GroupScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
