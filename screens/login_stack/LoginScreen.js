import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import * as firebase from 'firebase';

export default function LoginScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // TODO: Auto redirect if already signed in
    // TODO: Add other forms of login
    // TODO: Verification email
    // TODO: Disable button on click

    const emailInputHandler = inputEmail => {
        // TODO: Validate email
        setEmail(inputEmail);
    };

    const passwordInputHandler = inputPassword => {
        // TODO: Validate password
        setPassword(inputPassword);
    };

    const loginUser = (email, password) => {
        props.navigation.navigate("Dashboard")
        // firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        //     console.log(user)
        //     props.navigation.navigate("Dashboard")
        // }).catch(error => {
        //     Alert.alert(error.message);
        // })
    };

    return (
        <KeyboardAvoidingView behavior={"height"} style={styles.view}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../assets/logo/logo.png')} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={emailInputHandler}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={passwordInputHandler}
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.login} onPress={() => loginUser(email, password)}>
                            <Text style={styles.logintext}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login} onPress={() => props.navigation.navigate("Registration")}>
                            <Text style={styles.logintext}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '80%',
        height: undefined,
        aspectRatio: 1812 / 1289
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '80%',
        height: 50
    },
    buttons: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },
    login: {
        height: 50,
        alignItems: 'center',
        marginTop: 10
    }
});