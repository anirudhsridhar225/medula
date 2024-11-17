import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface ComponentProps {
    activeDays? :number[];
    onChange? :(days: number[]) => void;
}

export function getDays(selectedBtn: boolean[]) : number[] {
    let activeDays: number[] = [];

    for (let i= 0; i < selectedBtn.length; i++) {
        if (selectedBtn[i]) activeDays.push(i);
    }
    return activeDays;
}

export function getSelected(activeDays: number[]): boolean[] {
    let selectedBtn = new Array(7).fill(false);
    for (let i = 0; i < activeDays.length; i++) {
        selectedBtn[activeDays[i]] = true;
    }
    return selectedBtn;
}

function getDay(number: number): string {
    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[number];
}

export default function ({activeDays = [], onChange = () => null}: ComponentProps) {
    const [days, setDays] = useState(activeDays);

    function onDayChange(dayIndex: number) {
        let selectedBtn = getSelected(days);
        selectedBtn[dayIndex] = !selectedBtn[dayIndex];
        const newDays = getDays(selectedBtn);
        setDays(newDays);
        onChange(newDays);
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {getSelected(days).map((isSelected, index) => (
                    <Day
                        key={index}
                        isActive={isSelected}
                        dayIndex={index}
                        onUpdate={onDayChange}
                    />
                ))}
            </View>
        </View>
    );
}

function Day({
    isActive,
    dayIndex,
    onUpdate,
             }:{
    isActive?: boolean;
    dayIndex: number;
    onUpdate: (dayIndex: number) => void;
}) {
    return (
        <View style={{flex: 1}}>
            <TouchableOpacity
                style={[
                    isActive? styles.selectedBtn : styles.unSelectedBtn,
                    styles.btnContainer,
                ]}
                onPress={() => onUpdate(dayIndex)}
            >
                <Text
                    style={[
                        styles.text,
                        isActive? styles.selectedText : styles.unSelectedText,
                    ]}
                >
                    {getDay(dayIndex)}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "flex-start",
        marginVertical: 5,
    },
    innerContainer: {
        display: "flex",
        flexDirection: "column",
    },
    btnContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    selectedBtn: {
        color: "black",
        fontWeight: "bold",
        backgroundColor: "blue",
    },
    unSelectedBtn : {
        color: "black",
        borderWidth: 1,
        backgroundColor: "grey"
    },
    text : {
        fontWeight: "bold",
    },
    selectedText : {
        color: "white",
    },
    unSelectedText: {
        color: "black",
    },
});