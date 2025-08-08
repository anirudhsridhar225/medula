import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import {
    Alert,
    View,
} from "react-native";
import {
    Button,
    Card,
    Chip,
    Dialog,
    Portal,
    Text,
    useTheme
} from 'react-native-paper';

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

	const theme = useTheme();

	return (
		<View style={{ marginBottom: 12 }}>
			<Portal>
				<Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
					<Dialog.Title>{medName}</Dialog.Title>
					<Dialog.Content>
						{hasAlarm && alarmTime && (
							<View style={{ marginBottom: 16 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
									<MaterialIcons name="alarm" size={16} color={theme.colors.primary} />
									<Text variant="bodyMedium" style={{ marginLeft: 8 }}>
										Reminder: {formatTime(alarmTime)}
									</Text>
								</View>
								<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
									{days.map(dayIndex => {
										const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
										return (
											<Chip key={dayIndex} style={{ margin: 2 }} compact>
												{dayNames[dayIndex]}
											</Chip>
										);
									})}
								</View>
							</View>
						)}
						<Text variant="bodyLarge" style={{ textAlign: 'center', marginVertical: 16 }}>
							Current Count: {currCount}
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={handleSubtraction} disabled={currCount <= 0}>
							Remove
						</Button>
						<Button onPress={handleAddition}>
							Add
						</Button>
						<Button onPress={handleDeletion} textColor={theme.colors.error}>
							Delete
						</Button>
						<Button onPress={() => setModalVisible(false)}>
							Close
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<Card onPress={() => setModalVisible(true)} style={{ marginBottom: 8 }}>
				<Card.Content>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<View style={{ flex: 1 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
								<MaterialIcons 
									name="medical-services" 
									size={24} 
									color={theme.colors.primary} 
									style={{ marginRight: 12 }}
								/>
								<Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
									{medName}
								</Text>
							</View>
							{hasAlarm && alarmTime && (
								<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 36 }}>
									<MaterialIcons name="alarm" size={16} color={theme.colors.onSurfaceVariant} />
									<Text variant="bodySmall" style={{ marginLeft: 4, color: theme.colors.onSurfaceVariant }}>
										{formatTime(alarmTime)}
									</Text>
								</View>
							)}
						</View>
						<View style={{ alignItems: 'center' }}>
							<Text variant="headlineSmall" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
								{currCount}
							</Text>
							<Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
								pills
							</Text>
						</View>
					</View>
				</Card.Content>
			</Card>
		</View>
	);
};

export default Medicine;