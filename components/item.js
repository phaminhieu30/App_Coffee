import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native"
import { images, icons, colors } from "../constants"
import db from '../firebaseSetting';
import { fetchData } from "../getData";
import { useNavigation } from "@react-navigation/native";
import { pushCart } from '../pushCart';
import React, { useState, useEffect } from 'react';
import { pushFavourite } from "../pushFavourite";

export {
    ItemCoffee_Other, ItemBlendedIce_Yogurt, ItemFavourite
}
const heightItem = 240

const ItemCoffee_Other = (props) => {
    const { nameUser, item } = props;
    const { name, imgUrl, id, description, size } = item
    const [price, setPrice] = useState(null);
    const navigation = useNavigation();
    const sizeChoose = "M";
    const quantity = 1;

    useEffect(() => {
        if (size == undefined) {
            setPrice(item.price);
        } else {
            setPrice(size[0].price);
        }
    }, [item, size]);

    const addCart = async () => {
        const success = await pushCart(db, nameUser, item, quantity, sizeChoose);
    };

    const pressItem = async () => {
        navigation.navigate('Detail', { item: item, nameUser });
    };

    return (
        <TouchableOpacity style={stylesOtherItem.itemContainer} onPress={() => pressItem()}>
            <View style={stylesOtherItem.imageContainer}>
                <Image src={imgUrl} style={stylesOtherItem.image} />
            </View>
            <View style={stylesOtherItem.itemDetailContainer}>
                <Text style={styles.itemName} numberOfLines={1} ellipsize='tail'>{name}</Text>
                <View style={stylesOtherItem.favoriteAndPriceContainer}>
                    <View>
                        <View style={stylesOtherItem.favoriteContainer}>
                            <Text style={styles.favoriteText}>200k</Text>
                            <Image source={icons.heart} style={[styles.favoriteIcon, { marginLeft: 5 }]} />
                        </View>
                        {price !== null ? (
                            <Text style={styles.itemPrice}>{price.toLocaleString()}<Text> VNĐ</Text></Text>
                        ) : (
                            <Text style={styles.itemPrice}>Đang cập nhật...</Text>
                        )}
                    </View>
                    <TouchableOpacity onPress={addCart}>
                        <Image source={icons.addToCart} tintColor={colors.black} style={[styles.addIcon]} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const ItemFavourite = (props) => {
    const { nameUser, item } = props;
    const { name, imgUrl, id, description, size } = item
    const [favorite, setFavourite] = useState(true)
    const [price, setPrice] = useState(null);
    const navigation = useNavigation();
    const sizeChoose = "M";
    const quantity = 1;

    useEffect(() => {
        if (size === undefined) {
            setPrice(item.price);
        } else {
            setPrice(size[0].price);
        }
    }, [item, size]);

    const addCart = async () => {
        const success = await pushCart(db, nameUser, item, quantity, sizeChoose);
    };

    const pressItem = async () => {
        navigation.navigate('Detail', { item: item, nameUser });
    };

    const pressFavourite = () => {
        pushFavourite(db, nameUser, item)
        setFavourite(!favorite)
    }

    return (
        <TouchableOpacity style={stylesOtherItem.itemContainer} onPress={() => pressItem()}>   
            <View style={[stylesOtherItem.imageContainer, {flexDirection: 'row'}]}>
                <TouchableOpacity style={styles.favoriteButton} onPress={() => pressFavourite()}>
                    <Image source={favorite ? icons.favourite_active : icons.favourite_unactive} tintColor={colors.primary} style={styles.favouriteIcon}/>
                </TouchableOpacity>
                <Image src={imgUrl} style={[stylesOtherItem.image, {width: '80%', height: '80%'}]} />
            </View>
            <View style={stylesOtherItem.itemDetailContainer}>
                <Text style={styles.itemName} numberOfLines={1} ellipsize='tail'>{name}</Text>
                <View style={stylesOtherItem.favoriteAndPriceContainer}>
                    <View>
                        <View style={stylesOtherItem.favoriteContainer}>
                            <Text style={styles.favoriteText}>200k</Text>
                            <Image source={icons.heart} style={[styles.favoriteIcon, { marginLeft: 5 }]} />
                        </View>
                        {price !== null ? (
                            <Text style={styles.itemPrice}>{price.toLocaleString()}<Text> VNĐ</Text></Text>
                        ) : (
                            <Text style={styles.itemPrice}>Đang cập nhật...</Text>
                        )}
                    </View>
                    <TouchableOpacity onPress={addCart}>
                        <Image source={icons.addToCart} tintColor={colors.black} style={[styles.addIcon]} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const ItemBlendedIce_Yogurt = (props) => {
    const { name, imgUrl, price, category, nameUser, id } = props;
    const navigation = useNavigation();
    const size = "M"
    const quantity = 1

    const addCart = async () => {
        const cart = await fetchData(category, id);
        const success = await pushCart(db, nameUser, cart, quantity, size);
        console.log("Tới đây")
        console.log(success)
        if (success) {
            console.log("Vào rồi")
            navigation.navigate('Category', { refreshCart: true });
        }
    };

    const pressItem = async (category, id) => {
        const cart = await fetchData(category, id);
        if (cart) {
            navigation.navigate('Detail', { category, id, item: cart, nameUser });
        }
    };
    return <TouchableOpacity style={stylesBlendedIce.item} onPress={() => pressItem(category, id)}>
        <View style={stylesBlendedIce.itemBackground}></View>
        <View style={stylesBlendedIce.itemContent}>
            <View style={stylesBlendedIce.favorite}>
                <Image source={icons.heart} style={styles.favoriteIcon} tintColor={colors.primary}/>
                {/* <Text style={styles.favoriteText}>400k</Text> */}
            </View>
            <Image src={imgUrl} style={stylesBlendedIce.itemImage} resizeMode="cover"/>
        </View>
        <View style={stylesBlendedIce.itemDetails}>
            <Text style={styles.itemName} numberOfLines={1} ellipsize='tail'>{name}</Text>
            <View style={stylesBlendedIce.addContainer}>
                <Text style={styles.itemPrice}>{price.toLocaleString()}<Text> VNĐ</Text></Text>
                <TouchableOpacity onPress={addCart}>
                    <Image source={icons.addToCart} tintColor={colors.black} style={styles.addIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
}

const stylesOtherItem = StyleSheet.create({
    itemContainer: {
        width: 160,
        height: heightItem,
        marginBottom: 15,
        backgroundColor: colors.item,

        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 4,
    },
    imageContainer: {
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '90%',
        width: '90%'
    },
    itemDetailContainer: {
        paddingHorizontal: 14
    },
    favoriteAndPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 5
    },
    favoriteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
})

const stylesBlendedIce = StyleSheet.create({
    item: {
        width: 160,
        height: heightItem,
        marginBottom: 10,
    },
    itemBackground: {
        position: 'absolute',
        width: '100%',
        height: '75%',
        backgroundColor: colors.item,
        borderRadius: 12,
        marginTop: heightItem - heightItem * 0.75,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 4,
    },
    itemContent: {
        flexDirection: 'row',
        width: '100%',
        height: '72%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    favorite: {
        flexDirection: 'row',
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: 8,
    },
    itemImage: {
        width: '75%',
        height: '90%',
    },
    itemDetails: {
        marginHorizontal: 14,
    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
    },
})

const styles = StyleSheet.create({
    itemName: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 2,
        flexWrap:'wrap'
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
    },
    favoriteIcon: {
        height: 24,
        width: 24,
        marginRight: 5,
    },
    favoriteText: {
        fontSize: 15,
        fontWeight: '400',
        color: colors.black,
    },
    addIcon: {
        width: 30,
        height: 30
    },
    favouriteIcon: {
        width: 24,
        height: 24,
        marginTop: 12,
        marginLeft: 8
    },
    favoriteButton: {
        alignSelf: 'flex-start',
        width: 24,
        height: 24,
    }
})