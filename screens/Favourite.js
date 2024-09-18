import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../constants";
import { ItemFavourite } from "../components";
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { itemFavourite } from '../getData';

const Favourite = () => {
    const route = useRoute();
    const [data, setData] = useState(null);

    const getData = async () => {
        const itemData = await itemFavourite(route.params.name, null);
        setData(itemData);
    };

    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    );

    console.log(data)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Danh mục yêu thích</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.itemContainer}>
                    {data && data.map(item => {
                        return (<ItemFavourite key={item.name} nameUser={route.params.name} item={item} />);
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 22,
        fontWeight: '700',
        color: 'black',
        marginTop: 5,
        marginBottom: 15
    },
    scrollView: {
        marginBottom: 15,
        paddingHorizontal: 15,
        marginBottom: 70
    },
    itemContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export default Favourite;
