import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, Dimensions, SafeAreaView} from 'react-native';
import FlatListSlider from "./flat_list_slider/FlatListSlider";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function MemoryScreen(props) {
    const memory = props.navigation.state.params.memory;
    // TODO: set header text to memory title
    // TODO: get all images from memory when memories are no longer dummy data
    const IMAGES = [
        {
            image: memory.image,
            desc: "Description 1",
        },
        {
            image: require('./temp_images/img006.jpg'),
            desc: "Description 2 is much longer than Description 1",
        },
    ]

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <FlatListSlider
                        data={IMAGES}
                        imageKey={'image'}
                        width={SCREEN_WIDTH}
                        local={true}
                        separator={0}
                        loop={false}
                        autoscroll={false}
                        onPress={item => {}} // TODO: Create an image viewer?
                        indicator
                        animation
                    />
                    <View style={styles.spacer}/>
                    <Text style={styles.title}>{memory.title}</Text>
                    <View style={styles.spacer}/>
                    <Text style={styles.description}>{memory.description}</Text>
                    {/*
                    TODO: display date of memory
                    <View style={styles.spacer}/>
                    <Text style={styles.title}>{memory.date}</Text>
                    TODO: display tags
                     */}


                </ScrollView>
            </SafeAreaView>
        </View>
    );
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
    }
});