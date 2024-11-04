import Medicine from '@/components/Medicine';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Med = {
    medName: string;
    count: number;
};

const initialMedState: Med = {
    medName: "",
    count: 0
};

export default function HomeScreen() {

    const [newMed, setNewMed] = useState<Med>(initialMedState);
    const [modalVisible, setModalVisible] = useState(false);
    const [addedMeds, setAddedMeds] = useState<Med[]>([]);

    const handleMedicineAddition = () => {
        console.log(newMed);

        if (newMed.medName.trim() === '' && newMed.count <= 0) {
            return;
        }

        setAddedMeds([...addedMeds, newMed]);
        setNewMed(initialMedState);
        setModalVisible(!modalVisible);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setNewMed(initialMedState);
    };

    return (
        <View style={styles.overallContainer}>
            <View style={styles.medsWrapper}>
                <Text style={styles.initBox}>your medicines</Text>
                <View style={styles.medComponents}>
                    {
                        addedMeds.map((med, i) => {
                            return <Medicine
                                key={i}
                                medName={med.medName}
                                count={med.count}
                            />
                        })
                    }
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modal}
                >
                    <TextInput
                        style={styles.input}
                        placeholder={`Add a new medicine`}
                        value={newMed.medName}
                        onChangeText={text => setNewMed(prev => ({ ...prev, medName: text }))}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={`How much medicine`}
                        keyboardType="numeric"
                        value={newMed.count.toString()}
                        onChangeText={text => {
                            const count = text === '' ? 0 : parseInt(text);
                            setNewMed(prev => ({ ...prev, count }));
                        }}
                    />

                    <View style={styles.modalOperations}>
                        <TouchableOpacity
                            onPress={() => { handleMedicineAddition() }}
                            style={styles.addMedicine}
                        >
                            <Text>Add</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { toggleModal() }}
                            style={styles.closeModal}
                        >
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            <TouchableOpacity
                style={styles.addWrapper}
                onPress={() => { toggleModal() }}
            >
                <View style={styles.addButton}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    initBox: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    overallContainer: {
        flex: 1,
    },
    medsWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    medComponents: {
        marginTop: 20,
    },
    keyboard: {

    },
    input: {
        padding: 20,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 20,

    },
    addWrapper: {
        position: "absolute",
        width: "100%",
        height: 10,
        alignItems: "center",
        justifyContent: "center",
        bottom: 50,
    },
    addButton: {
        position: "absolute",
        right: 30,
        borderRadius: 60,
        height: 60,
        width: 60,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
    },
    addText: {
        color: "black",
        fontSize: 20,
    },
    modal: {
        position: "absolute",
        flexDirection: "column",
        height: "70%",
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        bottom: 0,
    },
    addMedicine: {
        backgroundColor: "green",
        padding: 20,
        borderRadius: 20,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    closeModal: {
        backgroundColor: "red",
        padding: 20,
        borderRadius: 20,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    modalOperations: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
    }
});