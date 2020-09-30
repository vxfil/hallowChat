import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  Text,
} from 'react-native';
import { THEME } from '../theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as AuthStyle from '../styles/auth';

const image = require('../../assets/back-signup2.png');

export const ForgotPassword = () => (
  <Formik
    initialValues={{
      email: '',
    }}
    validationSchema={Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please fill the field'),
    })}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.form}>
            <Text style={{ color: '#FFF', marginBottom: 15 }}>
              Enter your email address to reset your password
            </Text>
            <View style={styles.containerInput}>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {touched.email && errors.email ? (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            ) : null}
            <View style={styles.button}>
              <Button
                title="Submit"
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
});
