import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import { Icon } from "native-base";

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text>{navigation.getParam("product_name", "product name")}</Text>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("This is a button!")}>
          <Icon name="heart" type="EvilIcons" />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
        <Text>{this.props.navigation.state.params.product_name}</Text>
        <Image
          source={{
            uri: this.props.navigation.state.params.item.image_small_url
          }}
          style={{ width: 400, height: 400 }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  lineContainer: {
    height: 40,
    padding: 10
  }
});
