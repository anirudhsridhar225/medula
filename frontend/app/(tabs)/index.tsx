import React, { useState, useEffect } from "react";
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Switch,
	Alert,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scheduleMedicineNotification, cancelMedicineNotifications } from "@/components/NotificationService";
import Medicine from "@/components/Medicine";

type Med = {
	medName: string;
	count: number;
	hasAlarm: boolean;
	alarmTime?: {
		hour: number;
		minute: number;
	};
	days: number[];
};

const initialMedState: Med = {
	medName: "",
	count: 0,
	hasAlarm: false,
	alarmTime: undefined,
	days: [],
};

export default function HomeScreen() {
	const [newMed, setNewMed] = useState<Med>(initialMedState);
	const [modalVisible, setModalVisible] = useState(false);
	const [addedMeds, setAddedMeds] = useState<Med[]>([]);
	const [showTimePicker, setShowTimePicker] = useState(false);

	useEffect(() => {
		loadMedicineData();
	}, []);

	useEffect(() => {
		saveMedicineData();
	}, [addedMeds]);

	const loadMedicineData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("medicines");
			if (jsonValue !== null) {
				setAddedMeds(JSON.parse(jsonValue));
			} else {
				console.log("No medicine data found in AsyncStorage");
			}
		} catch (e) {
			console.error("Error loading medicine data:", e);
		}
	};

	const saveMedicineData = async () => {
		try {
			await AsyncStorage.setItem("medicines", JSON.stringify(addedMeds));
		} catch (e) {
			console.error("Error saving medicine data:", e);
		}
	};

	const handleMedicineAddition = async () => {
		if (newMed.medName.trim() === "" || newMed.count <= 0) {
			return;
		}

		// Validate alarm settings if alarm is enabled
		if (newMed.hasAlarm && !newMed.alarmTime) {
			alert("Please set a time for the alarm");
			return;
		}

		if (newMed.hasAlarm && newMed.days.length === 0) {
			alert("Please select at least one day for the alarm");
			return;
		}

		try {
			if (newMed.hasAlarm && newMed.alarmTime) {
				const notificationIds = await scheduleMedicineNotification(
					newMed.medName,
					newMed.alarmTime,
					newMed.days,
				);

				if (!notificationIds) {
					Alert.alert(
						"Notification Permission Required",
						"Please enable notifications in your device settings to receive medicine reminders."
					);
					return;
				}
			}

			setAddedMeds([...addedMeds, newMed]);
			setNewMed(initialMedState);
			setModalVisible(!modalVisible);
		} catch (e) {
			console.error("Error setting up notifications:", e);
			Alert.alert("Error", "Error setting up notifications");
		}
	};

	const handleMedicineDeletion = async (medName: string) => {
		try {
			await cancelMedicineNotifications(medName);

			const updatedMeds = addedMeds.filter((med) => med.medName !== medName);
			setAddedMeds(updatedMeds);
		} catch (e) {
			console.error("Error deleting medicine:", e);
		}
	};

	const handleMedicineUpdation = async (medName: string, newCount: number) => {
		try {
			const updatedMeds = addedMeds.map((med) => {
				if (med.medName === medName) {
					return { ...med, count: newCount };
				}
				return med;
			});
			setAddedMeds(updatedMeds);
			await saveMedicineData();
		} catch (e) {
			console.error("Error updating medicine:", e);
		}
	};

	const toggleModal = () => {
		setModalVisible(!modalVisible);
		setNewMed(initialMedState);
		setShowTimePicker(false);
	};

	const onTimeSelected = (event: any, selectedDate?: Date) => {
		setShowTimePicker(false);
		if (selectedDate && event.type !== 'dismissed') {
			setNewMed(prev => ({
				...prev,
				alarmTime: {
					hour: selectedDate.getHours(),
					minute: selectedDate.getMinutes()
				}
			}));
		}
	};

	const toggleDay = (dayIndex: number) => {
		setNewMed(prev => ({
			...prev,
			days: prev.days.includes(dayIndex)
				? prev.days.filter(d => d !== dayIndex)
				: [...prev.days, dayIndex]
		}));
	};

	return (
		<View style={styles.overallContainer}>
			<View style={styles.medsWrapper}>
				<Text style={styles.initBox}>your medicines</Text>
				<View style={styles.medComponents}>
					{addedMeds.map((med, i) => (
						<Medicine
							key={i}
							medName={med.medName}
							count={med.count}
							hasAlarm={med.hasAlarm}
							alarmTime={med.alarmTime}
							days={med.days}
							onDelete={handleMedicineDeletion}
							onUpdate={handleMedicineUpdation}
						/>
					))}
				</View>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={toggleModal}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.modal}
				>
					<Text style={styles.modalHeading}>Add a new medicine</Text>

					<Text style={styles.modalSubHeading}>Medicine Name:</Text>
					<TextInput
						style={styles.input}
						placeholder="Add a new medicine"
						value={newMed.medName}
						onChangeText={(text) =>
							setNewMed((prev) => ({ ...prev, medName: text }))
						}
					/>

					<Text style={styles.modalSubHeading}>Medicine Count:</Text>
					<TextInput
						style={styles.input}
						placeholder="How much medicine"
						keyboardType="numeric"
						value={newMed.count.toString()}
						onChangeText={(text) => {
							const count = text === "" ? 0 : parseInt(text);
							setNewMed((prev) => ({ ...prev, count }));
						}}
					/>

					<View style={styles.alarmSection}>
						<Text style={styles.modalSubHeading}>Set Reminder:</Text>
						<Switch
							value={newMed.hasAlarm}
							onValueChange={(value) =>
								setNewMed((prev) => ({ ...prev, hasAlarm: value }))
							}
						/>
					</View>

					{newMed.hasAlarm && (
						<>
							<TouchableOpacity
								style={styles.timeSelector}
								onPress={() => setShowTimePicker(true)}
							>
								<Text style={styles.timeSelectorText}>
									{newMed.alarmTime
										? `${newMed.alarmTime.hour}:${newMed.alarmTime.minute.toString().padStart(2, '0')}`
										: "Select Time"
									}
								</Text>
							</TouchableOpacity>

							<View style={styles.daysContainer}>
								{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
									<TouchableOpacity
										key={day}
										style={[
											styles.dayButton,
											newMed.days.includes(index) && styles.selectedDay
										]}
										onPress={() => toggleDay(index)}
									>
										<Text style={[
											styles.dayText,
											newMed.days.includes(index) && styles.selectedDayText
										]}>
											{day}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</>
					)}

					{showTimePicker && (
						<DateTimePicker
							value={new Date()}
							mode="time"
							is24Hour={false}
							display="default"
							onChange={onTimeSelected}
						/>
					)}

					<View style={styles.modalOperations}>
						<TouchableOpacity
							onPress={handleMedicineAddition}
							style={styles.addMedicine}
						>
							<Text style={styles.addText}>Add</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={toggleModal} style={styles.closeModal}>
							<Text style={styles.addText}>Close</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</Modal>

			<TouchableOpacity
				style={styles.addWrapper}
				onPress={() => {
					toggleModal();
				}}
			>
				<View style={styles.addButton}>
					<Text style={styles.addButtonText}>+</Text>
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
		color: "white",
		fontSize: 20,
		paddingHorizontal: 10,
	},
	addButtonText: {
		color: "black",
		fontSize: 20,
	},
	modal: {
		position: "absolute",
		flexDirection: "column",
		height: "80%", // Increased height to accommodate new components
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
	},
	modalHeading: {
		color: "black",
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	modalSubHeading: {
		color: "black",
		marginVertical: 5,
		fontSize: 20,
	},
	alarmSection: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	timeSelector: {
		backgroundColor: '#f0f0f0',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 10,
	},
	timeSelectorText: {
		fontSize: 18,
		width: 100,
		textAlign: 'center',
		color: '#333',
	},
	daysContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginVertical: 10,
		paddingHorizontal: 10,
	},
	dayButton: {
		padding: 10,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#ccc',
		marginVertical: 5,
		width: 45,
		alignItems: 'center',
	},
	selectedDay: {
		backgroundColor: '#007AFF',
		borderColor: '#007AFF',
	},
	dayText: {
		fontSize: 12,
		color: '#333',
	},
	selectedDayText: {
		color: 'white',
	},
});