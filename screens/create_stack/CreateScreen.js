import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Image, View, Platform, TouchableOpacity, Keyboard, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Database from '../../database';
import Icon from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

export default function MemoryPicker() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const conn = Database.getConnection();

  useEffect(() => {
    conn.transaction(tx => {
      tx.executeSql('drop table if exists images;');
      tx.executeSql(
        'create table if not exists images (id integer primary key not null, path string, title string, description string);'
      );
    });
  }, []);

  const titleInputHandler = inputTitle => {
    setTitle(inputTitle);
  };

  const descriptionInputHandler = inputDescription => {
    setDescription(inputDescription);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 0.1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveMemory = (uri, title, description) => {
    conn.transaction(tx => {
      tx.executeSql('insert into images (path, title, description) values (?, ?, ?);', [uri, title, description]);
      tx.executeSql('select * from images', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
      setImage(null);
    });
  }

  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.view}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {!image && <TouchableOpacity onPress={pickImage}>
            <Icon size={100} name="md-camera"/>
          </TouchableOpacity>}
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {image && <TextInput
            style={styles.input}
            placeholder="Title"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={titleInputHandler}
          />}
          {image && <TextInput
            style={styles.input_large}
            multiline
            placeholder="What is happening in this picture?"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={descriptionInputHandler}
          />}
          {image && <TouchableOpacity style={styles.submit} onPress={() => saveMemory(image, title, description)}>
            <Text>Save</Text>
          </TouchableOpacity>}
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
      justifyContent: 'flex-start',
      paddingVertical: '5%',
  },
  image: {
    width: '80%',
    height: '40%'
  },
  input: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      width: '80%',
      height: 50
  },
  input_large: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '80%',
    flex: 1,
    paddingVertical: 10,
    textAlignVertical: 'top'
  },
  submit: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#03b2a0',
    padding: 10,
    borderRadius: 5,
}
});