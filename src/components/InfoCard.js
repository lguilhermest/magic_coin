import React from "react";
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Color from "../Color";
import { iconSize } from "../Typography";
import Text from "./Text";

type Props = {
  cancelable?: Boolean,
  onBackdropPress?: () => {},
  onConfirm?: () => {},
  topics?: Array<{
    title?: String,
    items: Array<{
      label: String,
      icon?: String
    }>
  }>,
  title?: String,
  visible?: Boolean
}

export default function InfoCard(props: Props) {
  const { cancelable = true } = props;

  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={props.visible}
    >
      <View style={styles.container}>
        <Pressable
          onPress={props.onBackdropPress}
          style={styles.backdrop}
        />
        <View style={styles.card}>
          <Text
            bold
            center
            color={Color.accent}
            style={{ marginVertical: 10 }}
            size="headline"
          >
            {props.title}
          </Text>
          {props.topics && props.topics.map((topic, i) =>
            <View key={i}>
              {topic.title &&
                <Text>{topic.title}</Text>
              }
              {topic.items.map((item, id) =>
                <View style={styles.topicItem} key={id}>
                  <Icon
                    color={Color.accent}
                    style={{ paddingTop: 3 }}
                    size={iconSize.small}
                    name="circle-medium"
                  />
                  <Text style={{ flex: 1 }}>
                    {item.label}
                  </Text>
                </View>
              )}
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={cancelable ? props.onBackdropPress : props.onConfirm}
          >
            <Text size="headline" bold color={Color.accent}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  backdrop: {
    position: "absolute",
    backgroundColor: '#00000060',
    height: "100%",
    width: "100%",
    zIndex: -1
  },
  card: {
    borderRadius: 5,
    backgroundColor: Color.background,
    padding: 10,
    width: "70%",
  },
  topicItem: {
    alignItems: "flex-start",
    flexDirection: "row",
    paddingVertical: 4
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#00000012",
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 10
  }
})