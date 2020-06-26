import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { THEME } from '../theme';
import * as BubbleStyle from '../styles/chat';

export const TalkBubble = (props) => {
  return (
    <View>
      <View style={styles.talkRightBubble}>
        <View style={styles.talkBubbleRightTriangle} />
        <View style={styles.talkBubbleRightSquare}>
          <Text style={styles.textBubble}>{props.text}</Text>
          <Text style={styles.time}>{props.time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  talkLeftBubble: {
    ...BubbleStyle.talkLeftBubble,
    //marginLeft: 30,
  },
  talkBubbleLeftSquare: {
    ...BubbleStyle.talkBubbleSquare,
    backgroundColor: THEME.PRIMARY_BUTTON,
  },
  talkBubbleLeftTriangle: {
    ...BubbleStyle.talkBubbleLeftTriangle,
    //borderBottomWidth: 0,
    //borderBottomColor: 'transparent',
  },
  textBubble: {
    ...BubbleStyle.textBubble,
  },
  talkRightBubble: {
    ...BubbleStyle.talkRightBubble,
    //marginLeft: '62%',
  },
  talkBubbleRightSquare: {
    ...BubbleStyle.talkBubbleSquare,
    backgroundColor: THEME.SECONDARY_BUTTON,
  },

  talkBubbleRightTriangle: {
    ...BubbleStyle.talkBubbleRightTriangle,
  },

  time: {
    ...BubbleStyle.time,
  },
  //   talkBubbleTriangle: {
  //     position: 'absolute',
  //     left: -10,
  //     top: 0,
  //     width: 0,
  //     height: 0,
  //     borderTopColor: 'transparent',
  //     borderTopWidth: 0,
  //     borderRightWidth: 26,
  //     borderRightColor: THEME.PRIMARY_BUTTON,
  //     borderBottomWidth: 28,
  //     borderBottomColor: 'transparent',
  //   },
});
