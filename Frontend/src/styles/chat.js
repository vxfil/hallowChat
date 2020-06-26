import { THEME } from '../theme';
import { Dimensions } from 'react-native';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';

const vW = Dimensions.get('window').width;
const vH = Dimensions.get('window').height;

export const talkLeftBubble = {
  backgroundColor: 'transparent',
  marginTop: 0.03 * vH,
  marginRight: 'auto',
  marginLeft: 0.05 * vW,
  maxWidth: 0.8 * vW,
};

export const talkBubbleSquare = {
  borderRadius: 12,
  padding: 0.02 * vW,
};

export const talkBubbleLeftTriangle = {
  position: 'absolute',
  left: -12,
  bottom: 0,
  width: 0,
  height: 0,
  borderTopColor: 'transparent',
  borderTopWidth: 30,
  borderRightWidth: 30,
  borderRightColor: THEME.PRIMARY_BUTTON,
};

export const textBubble = {
  color: '#FFF',
  fontFamily: 'open-regular',
  fontWeight: '600',
  marginRight: 'auto',
  //marginLeft: 10,
};

export const talkRightBubble = {
  backgroundColor: 'transparent',
  marginTop: 0.02 * vH,
  marginRight: 0.05 * vW,
  marginLeft: 'auto',
  maxWidth: 0.8 * vW,
};

export const talkBubbleRightTriangle = {
  marginTop: 'auto',
  position: 'absolute',
  //top: 'auto',
  right: -8,
  bottom: 0,
  width: 0,
  height: 0,
  borderTopColor: 'transparent',
  borderTopWidth: 0.04 * vH,
  borderLeftWidth: 0.07 * vW,
  borderLeftColor: THEME.SECONDARY_BUTTON,
};

export const time = {
  color: '#FFF',
  marginLeft: 'auto',
  fontSize: 10,
};
