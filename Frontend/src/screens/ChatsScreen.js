import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ChatPreview } from '../components/ChatPreview';
import { ChatScreen } from '../screens/ChatScreen';
import { Dimensions } from 'react-native';
import { THEME } from '../theme';

const vW = Dimensions.get('window').width;
const vH = Dimensions.get('window').height;

const ava = require('../../assets/thumb-111656.jpg');

export const ChatsScreen = ({ navigation }) => {
  const chats = [
    {
      avatar: '',
      name: 'Barak Obama',
      lastMessage: 'bye bro!',
      id: new Date().toString(),
    },
    {
      avatar: ava,
      name: 'Donald Trump',
      lastMessage: 'we got it!',
      id: new Date().toString(),
    },
  ];

  const image = require('../../assets/squirrel-no-chats.png');

  return (
    <View style={styles.container}>
      {chats.length === 0 ? (
        <View>
          <Image style={styles.img} source={image} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.text}>You have no chats yet...</Text>
          </View>
        </View>
      ) : (
        chats.map((chat, index) => {
          return (
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.navigate('ChatPage')}
              key={index}
            >
              <ChatPreview
                avatar={chat.avatar}
                name={chat.name}
                lastMessage={chat.lastMessage}
                id={chat.id}
              />
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  img: {
    width: 1 * vW,
    height: 1 * vW,
  },
  text: {
    color: THEME.SECONDARY_BUTTON,
    fontFamily: 'open-bold',
    fontSize: 0.022 * vH,
  },
});
