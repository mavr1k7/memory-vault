import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as firebase from 'firebase';

export default function ProfileScreen(props) {

  const [accountBalance, setAccountBalance] = useState(20.00);

  const [fullName, setFullName] = useState('Aaron Waldrip');
  const [birthday, setBirthday] = useState('10/09/1977');
  const [phone, setPhone] = useState('(808) 687-0777');
  const [email, setEmail] = useState('mickwaldrip@hotmail.com');
  const [address, setAddress] = useState('650 Castro St');
  const [city, setCity] = useState('Mountain View');
  const [zipcode, setZipcode] = useState('94041');

  const signOutHandler = () => {
    firebase.auth().signOut().then(() => {
      props.navigation.navigate("Login")
    }).catch(error => {
      Alert.alert(error.message);
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.edit}>
        <TouchableOpacity onPress={() => signOutHandler()}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Edit")}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </View>
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
          <Text>{fullName}</Text>
        </View>
        <View style={styles.neighbors}>
          <Text>Birthday:</Text>
          <Text>{birthday}</Text>
        </View>
        <View style={styles.neighbors}>
          <Text>Phone:</Text>
          <Text>{phone}</Text>
        </View>
        <View style={styles.neighbors}>
          <Text>Email:</Text>
          <Text>{email}</Text>
        </View>
        <View style={styles.neighbors}>
          <Text>Address:</Text>
          <Text>{address}</Text>
        </View>
        <View style={styles.neighbors}>
          <Text>City:</Text>
          <Text>{city}</Text>
        </View>
        <View style={styles.neighbors}>
          <Text>Zip:</Text>
          <Text>{zipcode}</Text>
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
  edit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
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
});