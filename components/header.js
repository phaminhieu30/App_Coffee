import { StyleSheet, Image, Text, View } from "react-native"
import { icons } from "../constants"

const Header = ({title}) => {
    return <View style={styles.header}>
        <Image source={icons.back} style={styles.icon26}/>
        <Text style={styles.title}>{title}</Text>
        <Image source={icons.cart} style={styles.icon28}/>
    </View>
}

const styles = StyleSheet.create({
    header: {
        height: '7%',
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
    },
    icon26: {
        height: 26,
        width: 26,
    },
    icon28: {
        height: 28,
        width: 28,
    },
})

export default Header