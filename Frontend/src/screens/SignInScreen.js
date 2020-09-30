import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesome } from '@expo/vector-icons';
import * as AuthStyle from '../styles/auth';
import { switchIcon } from '../store/actions/authActions';

const image = require('../../assets/back-signup2.png');

export const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { icon, isHidden } = useSelector((state) => state.auth);
  console.log(icon);

  // const [icon, setIcon] = useState('eye');
  // const [isHidden, setIsHidden] = useState(true);

  // const changeIconHandler = () => {
  //   setIcon((prevState) => (prevState === 'eye' ? 'eye-slash' : 'eye'));
  //   setIsHidden((prevState) => !prevState);
  // };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Please fill the field'),
        password: Yup.string()
          .min(8, 'Must be 8 characters or more')
          .max(20, 'Must be 20 characters or less')
          .required('Please fill the field'),
      })}
      onSubmit={(values) => console.log(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
            <View style={styles.form}>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                ) : null}
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  secureTextEntry={isHidden}
                  style={styles.inputs}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <FontAwesome
                  style={styles.icon}
                  name={icon}
                  color={THEME.MAIN_COLOR}
                  onPress={() => dispatch(switchIcon())}
                />
              </View>

              {touched.password && errors.password ? (
                <Text style={styles.errorMessage}>{errors.password}</Text>
              ) : null}
              <Text
                style={styles.forgotPass}
                onPress={() => navigation.navigate('Forgot')}
              >
                Forgot your password?
              </Text>
              <View style={styles.button}>
                <Button
                  title="Sign in"
                  onPress={handleSubmit}
                  color={THEME.SECONDARY_BUTTON}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    ...AuthStyle.container,
  },
  image: {
    ...AuthStyle.image,
  },
  form: {
    ...AuthStyle.form,
  },
  containerInput: {
    ...AuthStyle.containerInput,
  },
  inputs: {
    ...AuthStyle.inputs,
  },
  button: {
    ...AuthStyle.button,
  },
  errorMessage: {
    ...AuthStyle.errorMessage,
  },
  forgotPass: {
    ...AuthStyle.forgotPass,
  },
  icon: {
    ...AuthStyle.icon,
  },
});
