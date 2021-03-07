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

//TODO: Get real data from the database
var data2 = [
    {
        id: '1',
        title: 'Memory 1',
        description: 'This is an example memory',
        images: [require('./temp_images/img001.jpg'), require('./temp_images/img002.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3tag3tag3tag3', id: '2'}, {tag: 'tag4', id: '3'},
            {tag: 'tag5', id: '4'}, {tag: 'tag6', id: '5'},],
    },
    {
        id: '2',
        title: 'Memory 2',
        description: 'This is an example memory',
        images: [require('./temp_images/img003.jpg'), require('./temp_images/img004.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '3',
        title: 'Memory 3 with a long title',
        description: 'This is an example memory',
        images: [require('./temp_images/img005.jpg'), require('./temp_images/img006.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '4',
        title: 'Memory 4',
        description: 'This is an example memory',
        images: [require('./temp_images/img007.jpg'), require('./temp_images/img008.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },
    {
        id: '5',
        title: 'Memory 5',
        description: 'This is an example memory',
        images: [require('./temp_images/img009.jpg'), require('./temp_images/img010.jpg')],
        idx: 0,
        tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}],
    },

];

export default class ViewScreen extends Component {
    static defaultProps = {
        data: data2,
    }

    constructor(props) {
        super(props)

    }

    render() {
      // Defines a Memory tag to be used in the FlatList
      const Memory = ({ item, index }) => (
          <TouchableOpacity style={styles.memory_block} onPress={() => {
            this.props.navigation.navigate('Memory', {
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

      return (
          <SafeAreaView style={styles.container}>
            <FlatList
                data={this.props.data}
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

    componentDidMount() {
        this.startAutoPlay();
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
        this.props.data[selectedItem.index].idx = (this.props.data[selectedItem["index"]].idx + 1) %
                this.props.data[selectedItem["index"]].images.length
        this.setState({data: this.props.data})
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