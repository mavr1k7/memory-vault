import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import TagList from "../tools/tag_list/TagList";
import openDatabase from "../../database";


export default function SearchScreen(props) {

  let searchBar;

  const [allTags, setAllTags] = useState([]);
  const [appliedTags, setAppliedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(()=>{
    let loadTags = async () => {
      let db = await openDatabase();
      db.transaction(tx => {
        tx.executeSql("select * from tag", [], (_, response) =>{
          setAllTags(response.rows._array);
          setFilteredTags(response.rows._array);
        });
      })
    }
    loadTags().then();
  }, []);

  const onTagFilter = (inputText) => {
    if (inputText === ''){
      setFilteredTags(allTags);
    }
    let newFilteredTags = [];
    for (var i = 0; i < allTags.length; i++){
      if (allTags[i].tag.toLowerCase().includes(inputText.toLowerCase())){
        newFilteredTags.push(allTags[i]);
      }
    }
    setFilteredTags(newFilteredTags)
  }

  const onTagAdd = (inputTag) => {
    let newAppliedTags = appliedTags;
    const index = newAppliedTags.indexOf(inputTag);
    if (index === -1) {
      newAppliedTags.push(inputTag);
    }
    setAppliedTags(newAppliedTags);
    useForceUpdate();
  }

  const onTagRemove = (inputTag) => {
    let newAppliedTags = appliedTags;
    const index = newAppliedTags.indexOf(inputTag);
    if (index > -1) {
      newAppliedTags.splice(index, 1);
    } else {
      console.log("tag not found");
    }
    setAppliedTags(newAppliedTags);
    useForceUpdate();
  }

  const onSearchInput = (text) => {
    setSearchInput(text);
  }

  const onReset = () => {
    searchBar.clear();
    setAppliedTags([]);
  }

  const onSearch = () => {
    props.navigation.navigate("SearchResults",
        {
          searchText: searchInput,
          searchTags: appliedTags,
          viewStack: false,
        });
  }

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView behavior={"height"}>
            <Text style={styles.title}>Text:</Text>
            <TextInput
                style={styles.input}
                placeholder="Search any text"
                autoCapitalize="none"
                autoCorrect={false}
                ref={input => {
                  searchBar = input }}
                onChangeText={onSearchInput}
            />
          </KeyboardAvoidingView>
          <Text style={styles.title}>Tags:</Text>
          <Text style={styles.subtitle}>Applied tags:</Text>
          <TagList
              tags={appliedTags}
              onTagPress={onTagRemove}
          />
          <KeyboardAvoidingView behavior={"height"}>
            <Text style={styles.subtitle}>Search for tags:</Text>
            <TextInput
                style={styles.input}
                placeholder="Tag name"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onTagFilter}
            />
            <TagList
                tags={filteredTags}
                onTagPress={onTagAdd}
            />
          </KeyboardAvoidingView>
          {/* TODO: Add a date range to the search */}
          <View style={{height: 10}}/>
          <View style={{flex: 1, flexDirection: 'column-reverse'}}>
            <View style={{flexDirection: 'row', marginBottom: 30,}}>
              <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={onReset}
              >
                <Text style={styles.btnText}>Reset</Text>
              </TouchableOpacity>
              <View style={{flex: 1}}/>
              <TouchableOpacity
                  style={styles.searchBtn}
                  onPress={onSearch}
              >
                <Text style={styles.btnText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    color: '#111',
    fontSize: 24,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  subtitle: {
    color: '#222',
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 10
  },
  resetBtn: {
    backgroundColor: '#ccc',
    padding: 10,
    paddingHorizontal: 20,
    marginLeft: 40,
    borderRadius: 5,
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 5,
    fontSize: 18,
  },
  searchBtn: {
    backgroundColor: '#7fe576',
    padding: 10,
    paddingHorizontal: 20,
    marginRight: 40,
    borderRadius: 5,
  },
});
