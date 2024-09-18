import { StyleSheet, Image, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { icons, colors } from "../constants"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from '../screens/Category'
import Home from '../screens/Home'
import User from '../screens/User'
import Favourite from '../screens/Favourite'
import Cart from '../screens/Cart';


const Tab = createBottomTabNavigator()
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const TabNavigator = ({route}) => {
    
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown : false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: styles.footer
            }}>
            <Tab.Screen name='Home' component={Home} initialParams={{name:route.params.name}}  options={{
                tabBarIcon: ({focused, color, size}) => {     
                    return <Image source={icons.home} style={styles.icon26} tintColor={focused?colors.primary:colors.black}/>
                }
            }}></Tab.Screen>
            <Tab.Screen name='Category' component={Category} initialParams={{name:route.params.name}} options={{
                tabBarIcon: ({focused, color, size}) => {     
                    return <Image source={focused?icons.category_fill:icons.category} style={styles.icon26} tintColor={focused?colors.primary:colors.black}/>
                }
            }}></Tab.Screen>
            <Tab.Screen name='Cart' component={Cart} initialParams={{name:route.params.name}} options={{
                tabBarIcon: ({focused, color, size}) => {     
                    return <Image source={icons.basket} style={styles.basket} tintColor={focused?colors.primary:colors.black} resizeMode='stretch'/>
                }
            }}></Tab.Screen>
            <Tab.Screen name='Favourite' component={Favourite} initialParams={{name:route.params.name}} options={{
                tabBarIcon: ({focused, color, size}) => {     
                    return <Image source={focused?icons.heart:icons.love} style={styles.icon28} tintColor={focused?colors.primary:colors.black}/>
                }
            }}></Tab.Screen>
            <Tab.Screen name='User' component={User} initialParams={{name:route.params.name}} options={{
                tabBarIcon: ({focused, color, size}) => {     
                    return <Image source={icons.user} style={styles.icon28} tintColor={focused?colors.primary:colors.black}/>
                }
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        height: '7%',
        width: screenWidth - 15*2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 20,
        marginTop: screenHeight - 70
    },
    icon26: {
        height: 26,
        width: 26,
    },
    icon28: {
        height: 28,
        width: 28,
    },
    basket: {
        height: 30,
        width: 26,
    }
})