import React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { THEME } from '../theme';

const vH = Dimensions.get('window').height;

const chatImage = require('../../assets/avatar1.png');

export const ChatPreview = ({ avatar, id, name, lastMessage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.chatImageContainer}>
        <Image style={styles.img} source={avatar || chatImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.chatName}>{name}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 0.11 * vH,
  },
  chatImageContainer: {
    width: '25%',
    height: 0.1 * vH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingLeft: 10,
    borderBottomColor: THEME.UNDERLINE,
    borderBottomWidth: 0.7,
  },
  chatName: {
    fontFamily: 'open-bold',
  },
  lastMessage: {
    fontFamily: 'open-regular',
  },
});
