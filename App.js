import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
Amplify.configure(awsconfig);
import Todo from "./Todo";

function App() {
  return (
    <View style={styles.container}>
      <Todo />
    </View>
  );
}

export default withAuthenticator(App, true);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
