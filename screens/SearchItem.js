import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { colors, icons } from "../constants";
import { StyleSheet, Image, Text, TouchableOpacity, View, ScrollView, TextInput, Dimensions, ActivityIndicator, Keyboard } from "react-native";
import { ItemCoffee_Other } from "../components";
import { findItem } from "../getData";

const screenWidth = Dimensions.get('window').width;
const SearchItem = (props) => {
    const route = useRoute();
    const [data, setData] = useState([]);
    const [searchKey, setSearchKey] = useState(route.params.searchKey || '');
    const [loading, setLoading] = useState(true);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const navigation = useNavigation();

    const handleSearch = async (search) => {
        setLoading(true);
        const data = await findItem(search);
        setData(data);
        setLoading(false);
    };

    useEffect(() => {
        handleSearch(route.params.searchKey);
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const back = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={back}>
                    <Image source={icons.back} style={styles.backIcon} resizeMode="stretch" />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Tìm kiếm</Text>
            </View>
            <View style={styles.searchContainer}>
                <Image source={icons.search} style={styles.searchIcon} />
                <TextInput
                    placeholder="Tìm kiếm"
                    style={styles.searchInput}
                    value={searchKey}
                    onChangeText={setSearchKey}
                    onSubmitEditing={() => handleSearch(searchKey)}
                />
            </View>
            {!keyboardVisible && (
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.itemContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            data.map(item => (
                                <ItemCoffee_Other key={item.id + item.collection} nameUser={route.params.nameUser} item={item} />
                            ))
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
    },
    titleHeader: {
        fontSize: 22,
        fontWeight: '700',
        color: 'black',
        marginTop: 5
    },
    backButton: {
        position: 'absolute',
        left: 20,
        padding: 10,
    },
    backIcon: {
        height: 30,
        width: 26,
    },
    searchContainer: {
        height: 50,
        width: screenWidth - 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 25,
        marginVertical: 20,
        backgroundColor: colors.secondary,
        paddingHorizontal: 10,
    },
    searchIcon: {
        height: 24,
        width: 24,
        marginRight: 10
    },
    searchInput: {
        flex: 1,
        fontSize: 17
    },
    scrollView: {
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    itemContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export default SearchItem;
