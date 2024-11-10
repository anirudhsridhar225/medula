import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react';

interface ButtonProps {
    onPress: () => void;
    title: string;
    fill?: boolean;
}

export default function CustomButton({
    onPress,
    title,
    fill = false,
                                     }:ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                fill ? styles.fillContainer:styles.normalContainer
            ]}
            onPress={onPress}
        >
            <Text
                style={[styles.buttonText, fill ? styles.fillText : styles.normalText]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 2,
        borderColor: "blue",
        borderRadius: 25,
    },
    fillContainer: {
        backgroundColor: "blue",
    },
    normalContainer: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontWeight: 'bold',
    },
    fillText: {
        color: 'white',
    },
    normalText: {
        color: "blue",
    },
});