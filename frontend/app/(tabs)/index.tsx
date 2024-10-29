import { StyleSheet, Text, SafeAreaView } from 'react-native';


export default function HomeScreen() {
    return (
        <SafeAreaView style = { styles.overallContainer }>
            <Text style = { styles.initBox }>hello</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    initBox : {
        backgroundColor: "blue",
        color: "white",
        padding: 10,
        margin: 10,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    overallContainer : {
        display: "flex",
    }
});