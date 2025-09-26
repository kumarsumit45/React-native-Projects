import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <><StatusBar barStyle={"dark-content"} backgroundColor={"yellow"}/>
    <Stack screenOptions={{
      headerShown: false
    }} /></>);
}
