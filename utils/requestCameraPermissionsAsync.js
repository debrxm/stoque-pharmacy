import * as Permissions from "expo-permissions";

export default (async function requestCameraPermissionsAsync() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === "granted";
});
