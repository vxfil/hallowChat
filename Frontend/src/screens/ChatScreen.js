import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { MessageSender } from '../components/MessageSender';
import { THEME } from '../theme';
import { TalkBubble } from '../components/TalkBubble';

const vW = Dimensions.get('window').width;
const vH = Dimensions.get('window').height;

const image = require('../../assets/squirrel-no-chats.png');
const font = require('../../assets/pattern1.jpg');

export const ChatScreen = ({}) => {
  const { messages } = useSelector((state) => state.messages);

  return (
    <View style={styles.container}>
      <ImageBackground source={font} style={styles.font}>
        {messages.map((msg, index) => {
          return <TalkBubble text={msg.text} time={msg.time} key={index} />;
        })}
        <MessageSender />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  font: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: '#FFF',
    borderColor: THEME.UNDERLINE,
    borderWidth: 0.2,
    height: '10%',
    justifyContent: 'flex-end',
  },
});
