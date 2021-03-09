import React, {Component} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import TagList from "../tools/tag_list/TagList";

var allTags = [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '9'}, {tag:'Isaac', id: '3'}];
var appliedTags = [];
var filteredTags = allTags;

export default class SearchScreen extends Component {
  static defaultProps = {
    appliedTags: [],
    filteredTags: allTags,
    searchText: '',
  }

  state = {
    searchInput: '',
  }

  render() {
    appliedTags = this.props.appliedTags;
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
                  ref={input => { this.searchBar = input }}
                  onChangeText={this.onSearchInput}
              />
            </KeyboardAvoidingView>
            <Text style={styles.title}>Tags:</Text>
            <Text style={styles.subtitle}>Applied tags:</Text>
            <TagList
                tags={appliedTags}
                onTagPress={this.onTagRemove}
            />
            <KeyboardAvoidingView behavior={"height"}>
              <Text style={styles.subtitle}>Search for tags:</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Tag name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={this.onTagFilter}
              />
              <TagList
                  tags={filteredTags}
                  onTagPress={this.onTagAdd}
              />
            </KeyboardAvoidingView>
            {/* TODO: Add a date range to the search */}
            <View style={{flex: 1, flexDirection: 'column-reverse'}}>
              <View style={{flexDirection: 'row', marginBottom: 30,}}>
                <TouchableOpacity
                    style={styles.resetBtn}
                    onPress={this.onReset}
                >
                  <Text style={styles.btnText}>Reset</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={styles.searchBtn}
                    onPress={this.onSearch}
                >
                  <Text style={styles.btnText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
    );
  }

  onSearchInput = (text) => {
    this.setState({searchInput: text});
  }

  onReset = () => {
    appliedTags = this.props.appliedTags;
    appliedTags.splice(0, appliedTags.length);
    this.searchBar.clear();
    this.setState({appliedTags: [], searchText: ''})
  }

  onSearch = () => {
    this.props.navigation.navigate("SearchResults",
        {
          searchText: this.state.searchInput,
          searchTags: appliedTags,
          viewStack: false,
        });
  }

  onTagFilter = (inputText) => {
    if (inputText === ''){
      this.setState({filteredTags: allTags})
    }
    filteredTags = [];
    for (var i = 0; i < allTags.length; i++){
      if (allTags[i].tag.includes(inputText)){
        filteredTags.push(allTags[i]);
      }
    }
    this.setState({filteredTags: filteredTags});
  }

  onTagAdd = (inputTag) => {
    appliedTags = this.props.appliedTags;
    const index = appliedTags.indexOf(inputTag);
    if (index === -1) {
      appliedTags.push(inputTag);
    }
    this.setState({appliedTags: appliedTags});
  }

  onTagRemove = (inputTag) => {
    appliedTags = this.props.appliedTags;
    const index = appliedTags.indexOf(inputTag);
    if (index > -1) {
      appliedTags.splice(index, 1);
    } else {
      console.log("tag not found");
    }
    this.setState({appliedTags: appliedTags});
  }
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