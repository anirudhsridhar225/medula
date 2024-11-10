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

/**
 * Component representing a single medicine item, with options to add, remove, delete, and update its count.
 * @param medName - The name of the medicine.
 * @param count - The initial count of the medicine.
 * @param hasAlarm - Whether the medicine has an alarm set.
 * @param alarmTime - Optional object containing hour and minute for the alarm.
 * @param days - Array of days when the alarm should trigger.
 * @param onDelete - Callback function to delete the medicine.
 * @param onUpdate - Callback function to update the medicine count.
 */

interface AlarmTime {
	hour: number;
	minute: number;
}

const Medicine = ({
					  medName,
					  count,
					  hasAlarm,
					  alarmTime,
					  days,
					  onDelete,
					  onUpdate,
				  }: {
	medName: string;
	count: number;
	hasAlarm: boolean;
	alarmTime?: AlarmTime;
	days: number[];
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

	const formatTime = (time?: AlarmTime) => {
		if (!time) return '';
		const hour = time.hour;
		const minute = time.minute.toString().padStart(2, '0');
		const period = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour % 12 || 12;
		return `${displayHour}:${minute} ${period}`;
	};

	const getDayNames = (dayIndices: number[]) => {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return dayIndices.map(index => days[index]).join(', ');
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
						{hasAlarm && alarmTime && (
							<View style={styles.alarmInfo}>
								<Text style={styles.alarmText}>
									Reminder: {formatTime(alarmTime)}
								</Text>
								<Text style={styles.alarmText}>
									Days: {getDayNames(days)}
								</Text>
							</View>
						)}
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

					<View style={styles.medInfo}>
						<Text style={styles.medTextStyle}>{medName}</Text>
						{hasAlarm && alarmTime && (
							<Text style={styles.alarmTimeStyle}>
								{formatTime(alarmTime)}
							</Text>
						)}
					</View>
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
		alignItems: "center",
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
	medInfo: {
		flex: 1,
		paddingLeft: 10,
	},
	medTextStyle: {
		color: "black",
		fontSize: 20,
	},
	alarmTimeStyle: {
		color: "gray",
		fontSize: 14,
		marginTop: 4,
	},
	medCountStyle: {
		color: "black",
		fontSize: 20,
		textAlign: "right",
		paddingRight: 20,
		width: "40%"
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
	alarmInfo: {
		marginBottom: 20,
		alignItems: "center",
	},
	alarmText: {
		fontSize: 16,
		color: "gray",
		marginBottom: 5,
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