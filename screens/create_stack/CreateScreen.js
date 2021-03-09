import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Image, View, Platform, TouchableOpacity, Keyboard, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import openDatabase from '../../database';
import Icon from '@expo/vector-icons/Ionicons';
import TagList from "../tools/tag_list/TagList";
import { TextInput } from 'react-native-gesture-handler';

export default function MemoryPicker(props) {
  const [forceUpdate, forceUpdateId] = useForceUpdate()
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

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


  /*useEffect(() => {
    conn.transaction(tx => {
      tx.executeSql('drop table if exists images;');
      tx.executeSql(
        'create table if not exists images (id integer primary key not null, title string, description string, images);'
      );
    });
  }, []);*/

  const titleInputHandler = inputTitle => {
    setTitle(inputTitle);
  };

  const descriptionInputHandler = inputDescription => {
    setDescription(inputDescription);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 0.1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onTagAdd = inputTags => {
    setTagInput(inputTags)
    if (inputTags[inputTags.length -1] === ',') {
      var oldTags = tags;
      var tag = inputTags.substring(0, inputTags.length - 1);

      oldTags.push({
        tag:   tag,
        id: Math.random().toString(),
      });
      setTagInput('');
      setTags(oldTags);
    }
  };

  const onRemoveTag = removeTag => {
    var oldTags = tags;
    var index = oldTags.indexOf(removeTag);
    if (index > -1) {
      oldTags.splice(index, 1);
    } else {
      console.log("tag not found");
    }
    setTags(oldTags);
    forceUpdate();
  };

  const saveMemory = (uri, title, description, tags) => {
    console.log(uri);
    async function save() {
      const conn = await openDatabase()
      // Insert memory
      let memoryId, imageId;
      await conn.transaction(tx => {
        tx.executeSql('insert into memory (title, description) values (?, ?)', [title, description], (_, result) => {
          memoryId = result.insertId;
        }, (_, error) => {
          console.log(error);
        });
      })
      await conn.transaction(tx => {
        // Insert image and connect with memory (loop these lines to input multiple images)
        tx.executeSql('insert into image (path) values (?);', [uri], (_, result) => {
          imageId = result.insertId;
          console.log(imageId, memoryId);
          tx.executeSql('insert into "memory-image" (image, memory) VALUES (?, ?);', [imageId, memoryId]);
        });
      })
      await conn.transaction(tx => {

        // Connect tags with new memory
        console.log('tags len', tags.length);
        for (let i = 0; i < tags.length; i++) {
          let tag = tags[i];
          console.log('tag: ',tag.tag);
          tx.executeSql("select * from tag where lower(tag)=lower(?);", [tag.tag], (tx, result) => {
            if (result.rows.length === 0) {
              // Tag doesn't exist, create it
              tx.executeSql("insert into tag (tag) values (?);", [tag.tag], () => {
                tx.executeSql("select * from tag where lower(tag)=lower(?);", [tag.tag], (tx, result) => {
                  // Connect tag with memory in memory-tag
                  let tagId = result.rows.item(0);
                  tx.executeSql('insert into "memory-tag" (memory, tag) values (?,?);', [memoryId, tagId]);
                })
              });
            } else {
              tx.executeSql("select * from tag where lower(tag)=lower(?);", [tag.tag], (tx, result) => {
                // Connect tag with memory in memory-tag
                let tagId = result.rows.item(0);
                tx.executeSql('insert into "memory-tag" (memory, tag) values (?,?);', [memoryId, tagId]);
              })
            }
          })
        }
      })
      await conn.transaction(tx => {

        let displayContents = false;
        // Log memories to console
        tx.executeSql('select * from memory;', [], (_, result ) =>{
          if(displayContents) {
            console.log(result.rows);
          }
        });
        tx.executeSql('select * from image;', [], (_, result)=> {
          if(displayContents) {
            console.log(result.rows);
          }
        });
        tx.executeSql('select * from tag;', [], (_, result)=> {
          if(!displayContents) {
            console.log(result.rows);
          }
        });
        tx.executeSql('select * from "memory-image";', [], (_, result)=> {
          if(displayContents) {
            console.log(result.rows);
          }
        });
        tx.executeSql('select * from "memory-tag";', [], (_, result)=> {
          if(!displayContents) {
            console.log(result.rows);
          }
        });
        setImage(null);
        props.navigation.navigate("View", {memories: []});
      });
    }
    save().then(()=>{
      console.log('Memory Saved')
    });
  };

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
          {image && <TagList
            tags={tags}
            onTagPress={onRemoveTag}
          />}
          {image && <TextInput
            style={styles.input}
            placeholder="Tags"
            autoCapitalize="none"
            autoCorrect={false}
            value={tagInput}
            onChangeText={onTagAdd}
          />}
          {image && <TouchableOpacity style={styles.submit} onPress={() => saveMemory(image, title, description, tags)}>
            <Text>Save</Text>
          </TouchableOpacity>}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
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