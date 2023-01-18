import React from "react";
import { StyleSheet } from "react-native";
import { Container } from "../../components";
import AnimatedCard from "../../components/AnimatedCard";

export default function Card() {
  return (
    <Container style={styles.container}>
      <AnimatedCard />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})