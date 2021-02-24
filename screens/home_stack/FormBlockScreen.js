import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function FormBlockScreen(props) {
    const joinBlock = () => null;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.instructions}>Form A Block</Text>
            </View>
            <View>
                <Text>Make Block Public?</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={joinBlock}
                >
                    <Text>My Invites</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={joinBlock}
                >
                    <Text>I Have An Invitation Code</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={joinBlock}
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