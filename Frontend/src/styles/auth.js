import { THEME } from '../theme';
import { Dimensions } from 'react-native';

const vW = Dimensions.get('window').width;
const vH = Dimensions.get('window').height;

export const container = {
  marginTop: vH / 10,
  flexDirection: 'column',
  height: vH / 1.6,
  width: vW,
};

export const image = {
  width: vW,
  height: vW * 1.12,
  resizeMode: 'cover',
  justifyContent: 'center',
};

export const form = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const containerInput = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '55%',
  height: vH * 0.06,
  marginTop: 10,
};

export const inputs = {
  backgroundColor: '#FFF',
  borderColor: '#8F87BF',
  borderWidth: 1,
  width: '100%',
  height: vH * 0.06,
  paddingLeft: vH * 0.01,
};

export const button = {
  width: '30%',
  marginLeft: 90,
  marginTop: 15,
};

export const errorMessage = {
  color: THEME.ERROR_MESSAGE,
};

export const forgotPass = {
  color: THEME.MAIN_COLOR,
  marginTop: 10,
};

export const icon = {
  position: 'absolute',
  margin: 'auto',
  right: 10,
  fontSize: 0.03 * vH,
};
