import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Medicine = ({
  medName,
  count,
  onDelete,
  onUpdate,
}: {
  medName: string;
  count: number;
  onDelete: (medName: string) => void;
  onUpdate: (medName: string, newCount: number) => void;
}) => {
  const [currCount, setCurrCount] = useState(count);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubtraction = () => {
    if (currCount > 0) {
      console.log(`You have ${count} ${medName} left`);
      const newCount = currCount - 1;
      setCurrCount(newCount);
      onUpdate(medName, newCount);

      if (currCount - 1 === 0) {
        Alert.alert("Alert", `Please restock ${medName}`, [{ text: "OK" }]);
      }
    }
  };

  const handleDeletion = () => {
    onDelete(medName);
    setModalVisible(!modalVisible);
  };

  const handleAddition = () => {
    const newCount = currCount + 1;
    setCurrCount(newCount);
    onUpdate(medName, newCount);
    console.log(`You have ${newCount} ${medName} now`);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{medName}</Text>
            <View style={styles.valueButtons}>
              <Pressable style={styles.increase} onPress={handleAddition}>
                <Text style={styles.textStyle}>Add {medName}</Text>
              </Pressable>

              <Pressable style={styles.decrease} onPress={handleSubtraction}>
                <Text style={styles.textStyle}>Remove {medName}</Text>
              </Pressable>
            </View>
            <Pressable
              style={styles.closeButton}
              onPress={() => handleDeletion()}
            >
              <Text style={styles.textStyle}>Delete {medName}</Text>
            </Pressable>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableNativeFeedback
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.medContainer}>
          <View style={styles.medicinePill}>
            <View style={styles.pill1}></View>
            <View style={styles.pill2}></View>
          </View>

          <Text style={styles.medTextStyle}>{medName}</Text>
          <Text style={styles.medCountStyle}>{currCount}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default Medicine;

const styles = StyleSheet.create({
  medContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 5,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  medicinePill: {
    flexDirection: "column",
    height: 25,
    width: 15,
    marginRight: 10,
    borderRadius: 25,
    transform: [{ rotate: "45deg" }],
    overflow: "hidden",
  },
  pill1: {
    backgroundColor: "blue",
    flex: 1,
  },
  pill2: {
    backgroundColor: "red",
    flex: 1,
  },
  medTextStyle: {
    color: "black",
    fontSize: 20,
    width: "80%",
    paddingLeft: 10,
  },
  medCountStyle: {
    color: "black",
    fontSize: 20,
    textAlign: "right",
    width: "20%",
    paddingRight: 20,
  },
  increase: {
    backgroundColor: "green",
    padding: 25,
    borderRadius: 10,
    margin: 10,
    width: "50%",
  },
  decrease: {
    backgroundColor: "red",
    padding: 25,
    borderRadius: 10,
    margin: 10,
    width: "50%",
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: "100%",
    height: "60%",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 30,
    width: "100%",
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  valueButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: "40%",
  }
});
