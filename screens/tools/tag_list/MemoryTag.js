import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from "react-native";

export default class MemoryTag extends Component {
    static defaultProps = {
        tag: '',
        tagId: 0,
    }

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <TouchableOpacity
                style={styles.tag}
                onPress={this.props.onPress}
            >
                <Text>{ this.props.tag }</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    tag: {
        minWidth: 90,
        paddingLeft: 20,
        paddingRight: 20,
        height: 30,
        borderWidth: 2,
        margin: 5,
        marginTop: 10,
        borderColor: '#000000',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
})