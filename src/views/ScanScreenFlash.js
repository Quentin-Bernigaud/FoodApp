import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Camera } from "expo-camera";
import { Permissions } from "expo-permissions";
import { Audio } from "expo-av";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class ScanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlashOn: false,
      flashState: Camera.Constants.FlashMode.off,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };
  }

  async componentDidMount() {
    //Getting Permission result from app details.
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  changeFlash() {
    this.state.isFlashOn
      ? this.setState({
          isFlashOn: false,
          flashState: Camera.Constants.FlashMode.off
        })
      : this.setState({
          isFlashOn: true,
          flashState: Camera.Constants.FlashMode.torch
        });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            type={this.state.type}
            flashMode={this.state.flashState}
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <Button title={"Flash"} onPress={() => this.changeFlash()} />
          </Camera>
        </View>
      );
    }
  }
}
