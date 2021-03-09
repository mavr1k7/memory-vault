import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native';
import openDatabase from "../../database";



//TODO: Get real data from the database
var data2 = [
  {
      id: '6',
      title: 'Stroller Ride',
      description: 'Today mom and dad took Isaac for a ride in the stroller for the first time. He had fun until he started to get a little cold, then he was upset.',
      images: [require('../view_stack/temp_images/IMG_5576.jpg'), require('../view_stack/temp_images/IMG_5576.jpg')],
      idx: 0,
      tags: [{tag:'Isaac', id: '3'}]
  },
  {
      id: '1',
      title: 'Happy Birthday',
      description: 'Isaac Jacob was born on January 29, 2021. He weighed 7lbs, 3oz and was 20 inches long',
      images: [require('../view_stack/temp_images/IMG_5159.jpg'), require('../view_stack/temp_images/IMG_5166.jpg')],
      idx: 0,
      tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
  },
  {
      id: '2',
      title: 'Funny Faces',
      description: 'Isaac just started wearing 0-3 month clothes and likes to make lots of funny faces.',
      images: [require('../view_stack/temp_images/IMG_5205.jpg'), require('../view_stack/temp_images/IMG_5196.jpg')],
      idx: 0,
      tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
  },
  {
      id: '3',
      title: 'Getting to know grandpa Castaneda',
      description: 'First day home and grandpa gets to meet his first grandson.',
      images: [require('../view_stack/temp_images/IMG_5225.jpg'), require('../view_stack/temp_images/IMG_5226.jpg')],
      idx: 0,
      tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
  },
  {
      id: '4',
      title: 'Same Birthday',
      description: 'Isaac and Ryder were born on the same day. We are good friends with their parents Kaleb and Mary and hope that these little guys will grow up to be great friends.',
      images: [require('../view_stack/temp_images/IMG_5330.jpg'), require('../view_stack/temp_images/IMG_5331.jpg')],
      idx: 0,
      tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
  },
  {
      id: '5',
      title: 'First Bath',
      description: 'Isaac had his first bath today. He pooped all over mommy and daddy, but it was nice for him to be clean.',
      images: [require('../view_stack/temp_images/IMG_5496.jpg'), require('../view_stack/temp_images/IMG_5497.jpg')],
      idx: 0,
      tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
  },
];

export default class ViewScreen extends Component {
    static defaultProps = {
        memories: [],
    }

    state = {
        memories: this.props.memories,
    }


    render() {
        if (!this.state.memories.length) {
            this.loadMemories().then()
        }
        // console.log(this.state.memories)
      // Defines a Memory tag to be used in the FlatList
      const Memory = ({ item, index }) => (
          <TouchableOpacity style={styles.memory_block} onPress={() => {
            this.props.navigation.navigate('Memory', {
              memory: item,
            });
          }}>
            <ImageBackground
                style={styles.memory_image}
                source={{uri: item.images[item.idx]}}
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

        return (
          <SafeAreaView style={styles.container}>
            <FlatList
                data={this.state.memories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                ListEmptyComponent={<View style={styles.no_items}>
                  <View>
                    <Text>You have no saved memories. Add one now!</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("Create")}>
                      <Text>New Memory</Text>
                    </TouchableOpacity>
                  </View>
                </View>}
                onViewableItemsChanged={this.onViewableItemsChanged}

            />
          </SafeAreaView>
      );
    }

    async loadMemories () {
        let db = await openDatabase();
        db.transaction(tx => {
            let memories = [];
            tx.executeSql("select * from memory", [], async (_, response) =>{

                // Populate memories list
                for (let i = 0; i < response.rows.length; i++){
                    let memory = response.rows.item(i);
                    memories.push({
                        id: memory.id,
                        title: memory.title,
                        description: memory.description,
                        images: [],
                        tags: [],
                        idx: 0,
                    });

                    tx.executeSql('SELECT path from image where id IN (SELECT image FROM "memory-image" WHERE memory=?);', [memory.id], (_, result)=>{
                        let images = [];
                        for (let i = 0; i < result.rows.length; i++){
                            images.push(result.rows.item(i).path);
                        }
                        memories[i]["images"] = images;
                        console.log(memories[i].images);
                    });
                    tx.executeSql('SELECT * from tag where id IN (SELECT tag FROM "memory-tag" WHERE memory=?);', [memory.id], (_, result)=>{
                        memories[i].tags = result.rows._array;
                    });
                }

                console.log(memories)
                this.setState({memories: memories})
            });
        })
    }

    componentDidMount(){

        if (!this.state.memories || !this.state.memories.length) {
            console.log('loading memories');
            this.loadMemories().then();
        }

        // this.startAutoPlay();
    }

    componentWillUnmount() {
        this.stopAutoPlay();
    }

    startAutoPlay = () => {
        this.stopAutoPlay();
        this.imageTimer = setInterval(
            this.changeRandomImage,
            5000,
        );
    }

    stopAutoPlay = () => {
        if (this.imageTimer) {
            clearInterval(this.imageTimer);
            this.imageTimer = null;
        }
    };

    onViewableItemsChanged = ({viewableItems, changed}) => {
        this.viewableItems = viewableItems;
    }

    changeRandomImage = () => {
        let viewableIndex = Math.floor(Math.random() * this.viewableItems.length);
        let selectedItem = this.viewableItems[viewableIndex];
        this.state.memories[selectedItem.index].idx = (this.state.memories[selectedItem["index"]].idx + 1) %
                this.state.memories[selectedItem["index"]].images.length
        this.setState({memories: this.state.memories})
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  no_items:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    padding: 10,
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

// export default ViewScreen;