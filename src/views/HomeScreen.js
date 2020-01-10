import React from "react";

import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Button,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { Audio } from "expo-av";

class ListItem extends React.Component {
  _onPress(item) {
    this.props.navigation.navigate("Details", {
      product_name: item.product_name,
      item: item
    });
  }

  render() {

    if(typeof(this.props.item.nutriscore_grade) == 'undefined'){
      console.log(this.props.item)
    }
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity style={styles.lineContainer} onPress={() => this._onPress(this.props.item)}>

            <Text style={{fontSize: 15, maxWidth: '65%'}}>{this.props.item.product_name}</Text>
            <Image
              source={{uri: 'https://static.openfoodfacts.org/images/misc/nutriscore-' + this.props.item.nutriscore_grade + '.png'}}
              style={styles.nutriscore_img}
            />

          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    // return fetch("https://fr-en.openfoodfacts.org/category/pizza/2.json")
    return fetch("https://fr-en.openfoodfacts.org/category/chocolates/1.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.products
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <ListItem item={item} navigation={this.props.navigation} />
          )}
          keyExtractor={({ id }, index) => id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  lineContainer: {
    fontSize: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingBottom: 5,
    borderTopColor: '#555',
    borderTopWidth: 1,
    justifyContent: 'space-between'
  },
  nutriscore_img: {
    aspectRatio: 1.8,
    width: 50,
    marginRight: 20
  }
});
