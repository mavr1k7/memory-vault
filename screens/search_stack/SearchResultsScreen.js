import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Image} from 'react-native';

const memories = [
    {
        id: '1',
        title: 'Memory 1',
        description: 'This is an example memory',
        images: [require('../view_stack/temp_images/img001.jpg'), require('../view_stack/temp_images/img002.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3tag3tag3tag3', id: '2'}, {tag: 'tag4', id: '3'},
            {tag: 'tag5', id: '4'}, {tag: 'tag6', id: '5'},],
    },
    {
        id: '2',
        title: 'Memory 2',
        description: 'This is an example memory',
        images: [require('../view_stack/temp_images/img003.jpg'), require('../view_stack/temp_images/img004.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '3',
        title: 'Memory 3 with a long title',
        description: 'This is an example memory',
        images: [require('../view_stack/temp_images/img005.jpg'), require('../view_stack/temp_images/img006.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '4',
        title: 'Memory 4',
        description: 'This is an example memory',
        images: [require('../view_stack/temp_images/img007.jpg'), require('../view_stack/temp_images/img008.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '5',
        title: 'Memory 5',
        description: 'This is an example memory',
        images: [require('../view_stack/temp_images/img009.jpg'), require('../view_stack/temp_images/img010.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },

];

export default class SearchResultsScreen extends Component {
    static defaultProps = {
        searchText: '',
        searchTags: [],
        // startDate: '',
        // endDate: '',
    }

    render() {
        let searchText = this.props.navigation.state.params.searchText;
        console.log("Search text:" + searchText.toString());
        // Search through memories and populate the results array for display
        var results = []
        let textResults = []
        let tagResults = []
        for (var i = 0; i < memories.length; i++){
            let memory = memories[i];
            if (searchText !== ''){
                if (memory.title.toLowerCase().includes(searchText.toLowerCase())){
                    textResults.push(memory);
                } else if (memory.description.toLowerCase().includes(searchText.toLowerCase())){
                    textResults.push(memory);
                }
            } else {
                textResults = memories;
            }
            // Check for memories with matching tags
            if (this.props.searchTags.length > 0) {
                let matchesTags = true;
                for (var j = 0; j < this.props.searchTags.length; j++){
                    let tag = this.props.searchTags[j];
                    if (!memory.tags.contains(tag)){
                        matchesTags = false;
                    }
                }
                if (matchesTags){
                    tagResults.push(memory);
                }
            } else {
                tagResults = memories;
            }
        }
        results = textResults.filter(value => tagResults.includes(value));
        // Compute intersection of textResults and tagResults
        console.log(textResults.length, tagResults.length, results.length);


        // Defines a Memory tag to be used in the FlatList
        const Memory = ({ item, index }) => (
            <TouchableOpacity style={styles.memory_block} onPress={() => {
                this.props.navigation.navigate('SearchMemory', {
                    memory: item,
                    title: "TEST NAME",
                });
            }}>
                <Image
                    style={styles.memory_image}
                    source={item.images[item.idx]}
                />
                <View style={styles.memory_title_block}>
                    <Text style={styles.memory_title}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );

        // Renders a Memory block and passes in the item to be rendered
        const renderItem = ({ item, index}) => {
            return (<Memory item={item} index={index}/>);
        };

        return (
            <View style={styles.container}>
                <FlatList
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<View style={styles.no_items}>
                        <View style={styles.no_results}>
                            <Text style={styles.subtitle}>0 search results returned</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate("Search")}>
                                <Text style={styles.btnText}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    ItemSeparatorComponent={() => (<View style={styles.item_separator}/>)}
                />
            </View>
        )
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

    no_results: {
        marginTop: 40,
        alignItems: "center",
        color: '#222',
        fontSize: 22,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#abcdef",
        color: "#000000",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    memory_block: {
        width: '100%',
        height: 100,
        marginVertical: 5,
        marginHorizontal: 1,
        flexDirection: 'row',
    },
    memory_title_block: {
        justifyContent: 'center',
    },
    memory_title: {
        fontSize: 20,
        padding: 5,
        paddingTop: 0,
        width: '100%',
    },
    memory_spacer: {
        flex: 1,
    },
    memory_image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    item_separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
    }
});