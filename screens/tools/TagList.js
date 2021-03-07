import React, {Component} from 'react';
import MemoryTag from "./MemoryTag";
import {FlatList, StyleSheet} from "react-native";

export default class TagList extends Component {
    static defaultProps = {
        tags: [],
    }

    constructor(props) {
        super(props)
    }

    onTagPress = this.props.onTagPress ? this.props.onTagPress: () => {
        // TODO: Open Search view for tag
        console.log("Tag is pressed");
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
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexGrow: 0,
        height: 40,
        marginVertical: 10,
    },
})