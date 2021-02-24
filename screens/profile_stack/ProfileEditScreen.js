import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function ProfileEditScreen() {

    const [accountBalance, setAccountBalance] = useState(20.00);

    const [fullName, setFullName] = useState('Aaron Waldrip');
    const [birthday, setBirthday] = useState('10/09/1977');
    const [phone, setPhone] = useState('(808) 687-0777');
    const [email, setEmail] = useState('mickwaldrip@hotmail.com');
    const [address, setAddress] = useState('650 Castro St');
    const [city, setCity] = useState('Mountain View');
    const [zipcode, setZipcode] = useState('94041');

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
                    <Text>Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="John Doe"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setFullName}
                    />
                </View>
                <View style={styles.neighbors}>
                    <Text>Birthday:</Text>
                    <Text>{birthday}</Text>
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
                    <Text>Email:</Text>
                    <Text>{email}</Text>
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
            </View>
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
    }
});