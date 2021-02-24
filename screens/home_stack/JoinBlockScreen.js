import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function JoinBlockScreen(props) {
    const joinBlock = () => null;

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={joinBlock}
                >
                    <Text>My Invites</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("InvitationCode")}
                >
                    <Text>I Have An Invitation Code</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("SearchBlocks")}
                >
                    <Text>Search Public Blocks</Text>
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
});