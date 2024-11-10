import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerProps {
    hour: number;
    minute: number;
    onChange?: (hour: number, minute: number) => void;
}

export default function TimePicker(props: TimePickerProps) {
    const { hour, minute, onChange = () => null } = props;
    const [showPicker, setShowPicker] = useState(false);

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setShowPicker(true)}
            >
                <Text style={styles.clockText}>
                    {hour < 10? '0' + hour : hour}
                </Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={getDate(hour, minute)}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(e, date) => {
                        setShowPicker(false);
                        if (date) {
                            onChange(date.getHours(), date.getMinutes());
                        }
                    }}
                />
            )}
        </View>
    );
}

function getDate(hour: number, minute: number): Date {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    clockText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 70,
    },
});