import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import { THEME } from '../theme';
import { sendMessage } from '../store/actions/messageActions';

const vW = Dimensions.get('window').width;
const vH = Dimensions.get('window').height;
const containerMinHeight = 0.07 * vH;
const maxContainerHeight = 0.25 * vH;

export const MessageSender = () => {
  const [containerHeight, setContainerHeight] = useState(containerMinHeight);
  const height = (arg) => {
    if (containerHeight > maxContainerHeight) {
      return;
    }
    setContainerHeight(containerMinHeight + arg.nativeEvent.contentSize.height);
  };

  const [text, setText] = useState('');
  const sendMsg = () => {
    dispatch(sendMessage({ text, time: moment().format('HH:mm') }));
    setText('');
  };

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      style={styles.wrap}
      behavior={Platform.OS == 'ios' ? 'padding' : null}
    >
      <View
        style={StyleSheet.flatten([
          styles.container,
          { height: containerHeight },
        ])}
      >
        <View style={styles.leftConatainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={THEME.PRIMARY_BUTTON}
              onContentSizeChange={height}
              multiline={true}
              style={styles.input}
              placeholder="Write your message..."
              onChangeText={setText}
              value={text}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                style={styles.buttons}
                source={require('../../assets/buttons/smile.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                style={styles.buttons}
                source={require('../../assets/buttons/gallery.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                style={styles.buttons}
                source={require('../../assets/buttons/camera.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                style={styles.buttons}
                source={require('../../assets/buttons/attachment.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                style={styles.buttons}
                source={require('../../assets/buttons/another.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => sendMsg()} activeOpacity={0.7}>
            <Image
              style={styles.sendButton}
              source={require('../../assets/buttons/send-message.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    maxHeight: 0.25 * vH,
    width: '100%',
    borderTopColor: THEME.UNDERLINE,
    borderTopWidth: 0.7,
  },
  leftConatainer: {
    width: '80%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  rightContainer: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    maxHeight: 0.18 * vH,
  },
  input: {
    marginLeft: 0.04 * vW,
    fontFamily: 'open-regular',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 0.005 * vH,
    marginBottom: 0.012 * vH,
  },
  buttons: {
    width: 0.04 * vH,
    height: 0.04 * vH,
    marginLeft: 0.04 * vW,
  },
  sendButton: {
    width: 0.053 * vH,
    height: 0.05 * vH,
    marginBottom: 0.03 * vH,
  },
});
