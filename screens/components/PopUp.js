import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import styles from "../styles";

const PopUp = (props) => {
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
          style={styles.modalContainer}
          onPress={() => {
            props.close();
          }}
        >
          <TouchableOpacity
            style={styles.modal}
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
