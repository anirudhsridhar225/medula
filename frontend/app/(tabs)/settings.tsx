import { StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
    return (
        <Text style = { styles.initBox }>hello</Text>
    );
}

const styles = StyleSheet.create({
    initBox : {
        backgroundColor: "blue",
        color: "white",
        padding: 10,
        margin: 10,
        textAlign: "center",
    }
});