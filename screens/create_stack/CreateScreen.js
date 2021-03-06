import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Database from '../../database'

export default function MemoryPicker() {
  const [images, setImages] = useState(null);

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
        'create table if not exists images (id integer primary key not null, image string);'
      );
      tx.executeSql('select * from images;',
        [],
        (_, { rows: { _array } }) => setImages(_array)
      );
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 0.1,
    });

    console.log(result);

    if (!result.cancelled) {
      conn.transaction(tx => {
        tx.executeSql('insert into images (image) values (?)', [result.uri]);
        tx.executeSql(
          'select * from images;',
          [],
          (_, { rows: { _array } }) => setImages(_array)
        );
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {images && images.map(({id, image}) => (
        <Image key={id} source={{ uri: image }} style={{ width: 200, height: 200 }} />
        // <Text key={id} style={{ color: '#000' }}>{image}</Text>
      ))}
      <TouchableOpacity 
        style={{ backgroundColor: '#1c9963'}} 
        onPress={() => 
          conn.transaction(
            tx => {
              tx.executeSql('drop table if exists images;');
            }
          )
        }>
          <Text>Drop Table</Text>
      </TouchableOpacity>
    </View>
  );
}