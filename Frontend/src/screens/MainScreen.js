import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import { THEME } from '../theme';

export const MainScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/squirrel1.png')} />
            <View style={styles.button}>
                <Button color={THEME.PRIMARY_BUTTON} title="Sign in" onPress={() => navigation.navigate('SignIn') } />
            </View>
            <View style={styles.button}>
                <Button color={THEME.SECONDARY_BUTTON} title="Sign up" onPress={() => navigation.navigate('SignUp') } />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 80
    },
    image: {
        width: 380,
        height: 350,
        marginBottom: 20
    },
    button: {
        width: "40%",
        marginBottom: 15
    }
})