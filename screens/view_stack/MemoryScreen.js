import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import FlatListSlider from "../tools/flat_list_slider/FlatListSlider";
import MemoryTag from "../tools/tag_list/MemoryTag";
import TagList from "../tools/tag_list/TagList";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MemoryScreen extends Component {
    render() {
        const memory = this.props.navigation.state.params.memory;
        // TODO: set header text to memory title
        // TODO: get all images from memory when memories are no longer dummy data
        let images = []

        for (let i = 0; i < memory.images.length; i++){
            images.push({image: memory.images[i]})
        }

        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.spacer}/>
                        <FlatListSlider
                            data={images}
                            imageKey={'image'}
                            width={SCREEN_WIDTH}
                            height={SCREEN_HEIGHT / 2.5}
                            resizeMethod={'scale'}
                            resizeMode="contain"
                            local={false}
                            separator={0}
                            loop={false}
                            autoscroll={false}
                            onPress={item => {
                            }} // TODO: Create an image viewer?
                            indicator={true}
                            animation={true}
                        />
                        <View style={styles.spacer}/>
                        <Text style={styles.title}>{memory.title}</Text>
                        <View style={styles.spacer}/>
                        <Text style={styles.description}>{memory.description}</Text>
                        {/*
                    TODO: display date of memory
                    <View style={styles.spacer}/>
                    <Text style={styles.title}>{memory.date}</Text>
                     */}

                        <TagList
                            tags={memory.tags}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        alignItems: 'center',
        color: '#393939',
        fontSize: 24,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    description: {
        color: '#393939',
        fontSize: 20,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    spacer: {
        height: 20,
    },
});