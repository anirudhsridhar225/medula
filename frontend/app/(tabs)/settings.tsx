import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View style = { styles.initBox }>
        <Text style = { styles.container }>hello</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "blue",
        color: "white",
        padding: 50,
        margin: 10,
        textAlign: "center",
    },

    initBox : {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});