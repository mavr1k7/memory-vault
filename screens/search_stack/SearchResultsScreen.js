import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Image} from 'react-native';

const memories = [
    {
        id: '1',
        title: 'Happy Birthday',
        description: 'Isaac Jacob was born on January 29, 2021. He weighed 7lbs, 3oz and was 20 inches long',
        images: [require('../view_stack/temp_images/IMG_5159.jpg'), require('../view_stack/temp_images/IMG_5166.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '2',
        title: 'Funny Faces',
        description: 'Isaac just started wearing 0-3 month clothes and likes to make lots of funny faces.',
        images: [require('../view_stack/temp_images/IMG_5205.jpg'), require('../view_stack/temp_images/IMG_5196.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '3',
        title: 'Getting to know grandpa Castaneda',
        description: 'First day home and grandpa gets to meet his first grandson.',
        images: [require('../view_stack/temp_images/IMG_5225.jpg'), require('../view_stack/temp_images/IMG_5226.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '4',
        title: 'Same Birthday',
        description: 'Isaac and Ryder were born on the same day. We are good friends with their parents Kaleb and Mary and hope that these little guys will grow up to be great friends.',
        images: [require('../view_stack/temp_images/IMG_5330.jpg'), require('../view_stack/temp_images/IMG_5331.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '5',
        title: 'First Bath',
        description: 'Isaac had his first bath today. He pooped all over mommy and daddy, but it was nice for him to be clean.',
        images: [require('../view_stack/temp_images/IMG_5496.jpg'), require('../view_stack/temp_images/IMG_5497.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
];

export default class SearchResultsScreen extends Component {
    static defaultProps = {
        searchText: '',
        searchTags: [],
        viewStack: false,
        // startDate: '',
        // endDate: '',
    }

    render() {
        let searchText = this.props.navigation.state.params.searchText;
        let searchTags = this.props.navigation.state.params.searchTags;
        let viewStack = this.props.navigation.state.params.viewStack;
        console.log(viewStack);
        // Search through memories and populate the results array for display
        var results = []
        let textResults = []
        let tagResults = []
        for (var i = 0; i < memories.length; i++){
            let memory = memories[i];
            if (searchText != null || searchText !== ''){
                if (memory.title.toLowerCase().includes(searchText.toLowerCase())){
                    textResults.push(memory);
                } else if (memory.description.toLowerCase().includes(searchText.toLowerCase())){
                    textResults.push(memory);
                }
            } else {
                textResults = memories;
            }
            // Check for memories with matching tags
            if (searchTags.length > 0) {
                let matchesTags = true;
                for (var j = 0; j < searchTags.length; j++){
                    let tag = searchTags[j];
                    if (!memory.tags.some(e => e.tag === tag.tag)){
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

        // Defines a Memory tag to be used in the FlatList
        const Memory = ({ item, index }) => (
            <TouchableOpacity style={styles.memory_block} onPress={() => {
                if (viewStack) {
                    this.props.navigation.navigate('Memory', {
                        memory: item,
                    });
                } else {
                    this.props.navigation.navigate('SearchMemory', {
                        memory: item,
                    });
                }
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