import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export const Sidebar = () => (
  <View style={styles.container}>
    <ScrollView>
      <Text>sim</Text>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
