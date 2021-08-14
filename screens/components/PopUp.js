import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import styles from "../styles";

const PopUp = (props) => {
  let addStyle = {};
  if (props.height) addStyle = { height: props.height };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.close();
        }}
      >
        <TouchableOpacity
          style={[styles.modalContainer]}
          onPress={() => {
            props.close();
          }}
        >
          <TouchableOpacity
            style={[styles.modal, addStyle]}
            onPress={() => {}}
            activeOpacity={1}
          >
            {props.children}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PopUp;
