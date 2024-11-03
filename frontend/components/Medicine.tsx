import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

const Medicine = ({
    medName,
    count,
}: {
    medName: string,
    count: number,
}) => {

    const [currCount, setCurrCount] = useState(count);

    const handleClick = () => {
        if (currCount > 0) {
            console.log(`You have ${count} ${medName} left`);
            setCurrCount(currCount - 1);

            if (currCount - 1 === 0) {
                Alert.alert("Alert",`Please restock ${medName}`, [{ text: "OK" }]);
            }
        } else {
            setCurrCount(currCount + 1);
        }
    };

    return (
        <TouchableNativeFeedback onPress = { handleClick }>
            <View style = { styles.medContainer }>
                <View style = { styles.medicinePill }>
                    <View style = { styles.pill1 }></View>
                    <View style = { styles.pill2 }></View>
                </View>

                <Text style = { styles.medTextStyle }>{medName}</Text>
                <Text style = { styles.medCountStyle }>{currCount}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

export default Medicine;

const styles = StyleSheet.create({
    medContainer : {
        flexDirection: "row",
        backgroundColor: "grey",
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
        transform : [{ rotate: "45deg" }],
        overflow: "hidden",
        borderColor: "white",
        borderWidth: 1,
    },

    pill1 : {
        backgroundColor: "blue",
        flex: 1,
    },

    pill2 : {
        backgroundColor: "red",
        flex: 1,
    },

    medTextStyle : {
        color: "white",
        fontSize: 20,
        width: "80%",
        paddingLeft: 10,
    },

    medCountStyle : {
        color: "white",
        fontSize: 20,
        textAlign: "right",
        width: "10%",
    },
});