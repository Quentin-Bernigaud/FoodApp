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

  handleBarCodeScanned({type, data}) {
      alert(`type: ${type} - data: ${data}`)
  }

  render() {
    const { hasCameraPermission } = this.state;
    let flash_title = "Flash";
    if (this.state.isFlashOn === true) {
        flash_title = "⚡ Flash ⚡"
    }
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
            onBarCodeScanned= {this.state.scanned ? undefined : this.handleBarCodeScanned}
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <Button title={flash_title} color={"#0097D7"} onPress={() => this.changeFlash()} />
          </Camera>
        </View>
      );
    }
  }
}
