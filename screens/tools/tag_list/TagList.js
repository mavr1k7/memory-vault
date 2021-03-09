import React, {Component} from 'react';
import MemoryTag from "./MemoryTag";
import {FlatList, StyleSheet, View, Text} from "react-native";

export default class TagList extends Component {
    static defaultProps = {
        tags: [],
    }

    constructor(props) {
        super(props)
    }

    onTagPress = this.props.onTagPress ? this.props.onTagPress: (tag) => {
        this.props.navigation.navigate("ViewTag", {
            searchText: '',
            searchTags: [tag],
            viewStack: true,
        });
    };


    render() {
        const renderTag = ({item}) => (
            <MemoryTag
                tag={item.tag}
                onPress={() => {this.onTagPress(item)}}
            />
        )

        return (
            <FlatList
                style={styles.list}
                horizontal={true}
                data={this.props.tags}
                renderItem={renderTag}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <View style={styles.no_items}>
                        <Text style={styles.no_items_text}>No Tags</Text>
                    </View>
                }
            />
        )
    }
};

const styles = StyleSheet.create({
    list: {
        flexGrow: 0,
        height: 40,
        marginVertical: 10,
    },
    no_items: {
        justifyContent: 'center',
    },
    no_items_text: {
        fontSize: 18,
        color: '#aaa',
        marginHorizontal: 20,
    }
})