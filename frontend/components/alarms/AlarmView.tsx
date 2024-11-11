import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Switch } from "react-native";

export default function AlarmView({
    uid,
    title,
    hour,
    minute,
    days,
    onPress,
    isActive,
    onChange
                                  }:{
    uid: string;
    title: string;
    hour: number;
    minute: number;
    days: number[];
    onPress: (uid: string) => void;
    isActive: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <TouchableOpacity
            onPress={() => onPress(uid)}
            style={styles.container}
        >
            <View style={styles.leftInnerContainer}>
                <Text style={styles.clock}>
                    {hour < 10? '0' + hour : hour}
                    {minute < 10? '0' + minute : minute}
                </Text>
                <View style={styles.descContainer}>
                    <Text>{getAlphabeticalDays(days)}</Text>
                </View>
            </View>
            <View style={styles.rightInnerContainer}>
                <Switch
                    ios_backgroundColor={'black'}
                    trackColor={{false: "grey", true: "blue"}}
                    value={isActive}
                    onValueChange={onChange}
                />
            </View>
        </TouchableOpacity>
    );
}

function getAlphabeticalDays(days: number[]) {
    let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(day => weekDays[day]).join(' ');
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    leftInnerContainer: {
        margin: 5,
        flex: 1,
        alignItems: 'flex-start',
    },
    rightInnerContainer: {
        margin: 5,
        marginRight: 0,
        flex: 1,
        alignItems: 'flex-end',
    },
    descContainer: {
        flexDirection: 'row',
        color: 'grey',
    },
    clock: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 10,
    },
});