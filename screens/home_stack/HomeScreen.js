import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

export default function HomeScreen(props) {
  const joinBlock = () => null;

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo/Asset_6.png')} />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("JoinBlock")}
        >
          <Text>join a block</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={joinBlock}
        >
          <Text>form a block</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={joinBlock}
        >
          <Text>join a block party</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={joinBlock}
        >
          <Text>start a block party</Text>
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
  logo: {
    width: '80%',
    resizeMode: 'contain',
  },
});