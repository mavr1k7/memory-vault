import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default ({
                 item,
                 style,
                 onPress,
                 index,
                 imageKey,
                 local,
                 height
                }) => {
    return (
        <View
            style={styles.container}
            onPress={() => onPress(index)}>
            <Image
                style={[styles.image, style, {height: height}]}
                source={local ? item[imageKey] : {uri: item[imageKey]}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    image: {
        height: 230,
        resizeMode: 'contain',
    },
});