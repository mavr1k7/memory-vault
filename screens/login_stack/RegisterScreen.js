import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import * as firebase from 'firebase';

export default function RegisterScreen(props) {

    const [accountBalance, setAccountBalance] = useState(20.00);

    const [fullName, setFullName] = useState('Aaron Waldrip');
    const [birthday, setBirthday] = useState('10/09/1977');
    const [phone, setPhone] = useState('(808) 687-0777');
    const [email, setEmail] = useState('mickwaldrip@hotmail.com');
    const [password, setPassword] = useState('password');
    const [address, setAddress] = useState('650 Castro St');
    const [city, setCity] = useState('Mountain View');
    const [zipcode, setZipcode] = useState('94041');

    const registerUser = () => {
        props.navigation.navigate("Dashboard")
        // firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        //     console.log(user)
        //     props.navigation.navigate("Dashboard")
        // }).catch(error => {
        //     Alert.alert(error.message);
        // })
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profile}
                    source={{ uri: 'https://devshift.biz/wp-content/uploads/2017/04/profile-icon-png-898.png' }}
                />
                <Text>ACCOUNT BALANCE: ${accountBalance}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.neighbors}>
                    <Text>Name:*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="John Doe"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setFullName}
                    />
                </View>
                <View style={styles.neighbors}>
                    <Text>Email:*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="johndoe@email.com"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.neighbors}>
                    <Text>Password:*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.neighbors}>
                    <Text>Phone:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="(800) 444-1234"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setPhone}
                    />
                </View>
                <View style={styles.neighbors}>
                    <Text>Birthday:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="01/01/99"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setBirthday}
                    />
                </View>
                <View style={styles.neighbors}>
                    <Text>Address:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="123 Cherry St."
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setAddress}
                    />
                </View>
                <View style={styles.neighbors}>
                    <Text>City:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Denver"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setCity}
                    />
                </View>
                <View style={styles.neighbors}>
                    <Text>Zip:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="12345"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setZipcode}
                    />
                </View>
                <Text>* Required Information</Text>
            </View>
            <TouchableOpacity style={styles.login} onPress={() => registerUser()}>
                <Text style={styles.logintext}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profile: {
        width: 80,
        height: 80,
    },
    detailsContainer: {
        width: '70%',
    },
    neighbors: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 25,
        width: 150,
        borderRadius: 5,
        padding: 4,
    },
    login: {
        height: 50,
        alignItems: 'center',
        marginTop: 10
    }
});