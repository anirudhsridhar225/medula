import Medicine from '@/components/Medicine';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View style = { styles.overallContainer }>
            <Text style = { styles.initBox }>your medicines</Text>
            <Medicine medName="Paracetamol" count={10} />
            <Medicine medName="Anthraprazole" count={15} />
        </View>
    );
}

const styles = StyleSheet.create({
    initBox : {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "capitalize",
    },

    overallContainer : {
        flex: 1,
        marginTop: 40,
        margin: 10,
        paddingTop: 60,
        paddingHorizontal: 20,
    }
});