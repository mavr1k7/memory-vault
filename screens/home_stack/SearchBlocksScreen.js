import React, { useState } from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function SearchBlocksScreen(props) {
    const joinBlock = () => null;

    const [searchTerm, setSearchTerm] = useState('');

    const searchInputHandler = search => {
        // TODO: Validate code
        setSearchTerm(search);
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.top}>
                    <Text>
                        Enter Your Search Term:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Lawn Care"
                        autoCapitalize="characters"
                        autoCorrect={false}
                        onChangeText={searchInputHandler}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={joinBlock}
                >
                    <Text>Search</Text>
                </TouchableOpacity>
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
    button: {
        alignItems: "center",
        backgroundColor: "#F8EB23",
        borderColor: "#2483C5",
        color: "#000000",
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    input: {
        alignItems: 'center',
        textAlign: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '80%',
        height: 50,
        padding: 10,
    },
    top: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});