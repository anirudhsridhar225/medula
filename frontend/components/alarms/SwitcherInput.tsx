import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

interface ToggleSwitchProps {
    value: boolean;
    onChange: (value: boolean) => void;
    description: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onChange, description }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Switch
                    ios_backgroundColor="black"
                    trackColor={{ false: "grey", true: "blue" }}
                    value={value}
                    onValueChange={onChange}
                />
            </View>
        </View>
    );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    descriptionText: {
        fontWeight: 'bold',
        color: "blue",
    },
});
