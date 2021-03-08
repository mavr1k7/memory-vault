import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Alert, Image, ImageBackground, LayoutAnimation} from 'react-native';
import FlatListSlider from "../tools/flat_list_slider/FlatListSlider";
import MemoryTag from "../tools/tag_list/MemoryTag";
import TagList from "../tools/tag_list/TagList";

const SCREEN_WIDTH = Dimensions.get('window').width;
//import Swiper from 'react-native-swiper'

//TODO: Get real data from the database
var data = [
    {
        id: '1',
        title: 'Happy Birthday',
        description: 'Isaac Jacob was born on January 29, 2021. He weighed 7lbs, 3oz and was 20 inches long',
        images: [require('../view_stack/temp_images/IMG_5159.jpg'), require('../view_stack/temp_images/IMG_5166.jpg')],
        idx: 0,
    },
    {
        id: '2',
        title: 'Funny Faces',
        description: 'Isaac just started wearing 0-3 month clothes and likes to make lots of funny faces.',
        images: [require('../view_stack/temp_images/IMG_5205.jpg'), require('../view_stack/temp_images/IMG_5196.jpg')],
        idx: 0,
    },
    {
        id: '3',
        title: 'Getting to know grandpa Castaneda',
        description: 'First day home and grandpa gets to meet his first grandson.',
        images: [require('../view_stack/temp_images/IMG_5225.jpg'), require('../view_stack/temp_images/IMG_5226.jpg')],
        idx: 0,
    },
    {
        id: '4',
        title: 'Same Birthday',
        description: 'Isaac and Ryder were born on the same day. We are good friends with their parents Kaleb and Mary and hope that these little guys will grow up to be great friends.',
        images: [require('../view_stack/temp_images/IMG_5330.jpg'), require('../view_stack/temp_images/IMG_5331.jpg')],
        idx: 0,
    },
    {
        id: '5',
        title: 'First Bath',
        description: 'Isaac had his first bath today. He pooped all over mommy and daddy, but it was nice for him to be clean.',
        images: [require('../view_stack/temp_images/IMG_5496.jpg'), require('../view_stack/temp_images/IMG_5497.jpg')],
        idx: 0,
    },
];

export default function HomeScreen(props) {
  const joinBlock = () => null;
  //TODO: Add a swipable memory view containing some recent memories/highlights
  //TODO: get date of most recent memory and use to determine number of days
  //TODO: navigate to create memory tab
  //TODO: create some tips to cycle through each day.

  // Defines a Memory tag to be used in the FlatList
    const Memory = ({ item, index }) => (
        <TouchableOpacity style={styles.memory_block} onPress={() => {
          props.navigation.navigate('Memory', {
            memory: item,
            title: "TEST NAME",
          });
        }}>
          <ImageBackground
              style={styles.memory_image}
              source={item.images[item.idx]}
          >
            <View style={styles.memory_spacer}/>
            <Text style={styles.memory_title}>{item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
    );

    // Renders a Memory block and passes in the item to be rendered
    const renderItem = ({ item, index }) => {
      return (<Memory item={item} index={index}/>);
    };

  const IMAGES = [
      {
          image: data[0].images[0],
          title: data[0].title,
      },
      {
          image: data[1].images[0],
          title: data[1].title,
      },
      {
          image: data[2].images[0],
          title: data[2].title,
      },
      {
          image: data[3].images[0],
          title: data[3].title,
      },
      {
          image: data[4].images[0],
          title: data[4].title,
      },
  ]

  return (
    <View style={styles.container}>
        <SafeAreaView>
            <ScrollView>
                <Image style={styles.logo} source={require('../../assets/logo/Asset_6.png')} />
                <FlatListSlider
                    data={IMAGES}
                    imageKey={'image'}
                    width={SCREEN_WIDTH}
                    local={true}
                    separator={0}
                    loop={true}
                    autoscroll={true}
                    timer={7000}
                    onPress={index =>
                        {console.log(index)
                        props.navigation.navigate('HomeMemory', {
                        memory: data[index],

                        })}}
                    indicator={true}
                    animation={true}
                />
                <View>
                    <Text style={styles.headerText}>
                        6 Days since last memory
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.navigation.navigate("Create")}
                        >
                        <Text>Add New Memory</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        Tip of the Day
                    </Text>
                    <Text style={styles.logoDescription}>
                        Customize your push notification to ensure you are meeting your goals.
                    </Text>
                </View>
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
  instructions: {
    color: '#888',
    fontSize: 20,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  headerText: {
      fontSize: 26,
      fontWeight: '600',
      color: '#888',
      marginHorizontal: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F8EB23",
    borderColor: "#2483C5",
    color: "#000000",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginHorizontal: 15,
  },
  logo: {
    width: '80%',
    resizeMode: 'contain',
  },
  logoDescription:{
    fontSize: 15,
    fontWeight: '600',
    color: '#888',
    marginHorizontal: 20,
  },
  placeholder:{
    fontSize: 32,
    color: '#888',
    fontWeight: '600',
    margin: 30,
  },
  memory_block: {
      backgroundColor: '#cccccc',
      width: '49%',
      height: 200,
      marginVertical: 1,
      marginHorizontal: 1,
  },
  memory_title: {
      fontSize: 20,
      backgroundColor: '#cccccc66',
      padding: 5,
      paddingTop: 0,
  },
  memory_spacer: {
      flex: 1,
  },
  memory_image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      justifyContent: 'flex-end',
  }
});