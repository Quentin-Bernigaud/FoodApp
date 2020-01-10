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
    console.log(this.props.navigation);
    this.props.navigation.navigate("Details", {
      product_name: item.product_name,
      item: item
    });
  }

  render() {
    return (
      <View style={styles.lineContainer}>
        <TouchableOpacity onPress={() => this._onPress(this.props.item)}>
          <Text>{this.props.item.product_name}</Text>
        </TouchableOpacity>
      </View>
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
    paddingLeft: 10,
    paddingBottom: 5
  }
});
