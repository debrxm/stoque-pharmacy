import * as BarCodeScanner from "expo-barcode-scanner";
import React from "react";
import { Linking, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cxlxrs } from "../../constants/Colors";

import { Camera } from "expo-camera";
import QRFooterButton from "../CodeScannerButton/CodeScannerButton";
import QRIndicator from "../CodeScannerIndicator/CodeScannerIndicator";

const initialState = { isVisible: Platform.OS === "ios", url: null };

export default function BarCodeScreen(props) {
  const [state, setState] = React.useReducer(
    (props, state) => ({ ...props, ...state }),
    initialState
  );
  const [isLit, setLit] = React.useState(false);
  const [deviceCameraRatio, setDeviceCameraRatio] = React.useState(["16:9"]);
  let camera;
  React.useEffect(() => {
    let timeout;
    if (!state.isVisible) {
      timeout = setTimeout(() => {
        setState({ isVisible: true });
      }, 800);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [""]);

  React.useEffect(() => {
    if (!state.isVisible && state.url) {
      openUrl(state.url);
    }
  }, [state.isVisible, state.url]);

  const getRatio = async () => {
    let ratio = await camera.getSupportedRatiosAsync();
    setDeviceCameraRatio(ratio.pop());
  };
  const openUrl = (url) => {
    props.navigation.pop();

    setTimeout(
      () => {
        // note(brentvatne): Manually reset the status bar before opening the
        // experience so that we restore the correct status bar color when
        // returning to home
        // StatusBar.setBarStyle("default");
        Linking.openURL(url);
      },
      Platform.select({
        ios: 16,
        // note(brentvatne): Give the modal a bit of time to dismiss on Android
        default: 500,
      })
    );
  };

  const onCancel = React.useCallback(() => {
    props.setScannerVisible(false);
  }, []);

  const onFlashToggle = React.useCallback(() => {
    setLit((isLit) => !isLit);
  }, []);

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {state.isVisible ? (
        <Camera
          ref={(ref) => (camera = ref)}
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.ean13,
              BarCodeScanner.Constants.BarCodeType.ean8,
            ],
          }}
          ratio={deviceCameraRatio}
          onCameraReady={getRatio}
          onBarCodeScanned={
            props.scanned ? undefined : props.handleBarCodeScanned
          }
          style={{ ...StyleSheet.absoluteFill }}
          flashMode={isLit ? "torch" : "off"}
        />
      ) : null}

      <QRIndicator />
      <View style={[styles.footer, { bottom: 30 + bottom }]}>
        <QRFooterButton
          onPress={onFlashToggle}
          isActive={isLit}
          iconName="ios-flashlight"
          iconSize={15}
        />
        {props.scanned && (
          <QRFooterButton
            onPress={() => props.setScanned(false)}
            iconName="md-refresh-outline"
            iconSize={24}
            iconColor={cxlxrs.black}
            style={{ backgroundColor: cxlxrs.white }}
            reScan
          />
        )}
        <QRFooterButton onPress={onCancel} iconName="ios-close" iconSize={20} />
      </View>

      {/* <StatusBar barStyle="light-content" backgroundColor="#000" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  hint: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
  },
});
