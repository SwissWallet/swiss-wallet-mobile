// @ts-nocheck
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@gluestack-ui/themed";
import { Book, Coffee, CoffeeIcon, Gift, HomeIcon, ShoppingBag, ShoppingCart, StoreIcon } from "lucide-react-native";
import Home from "../pages/Home";
import Store from "../pages/Store";
import Coffe from "../pages/Coffe";
import Library from "../pages/Library";
import Benefits from "../pages/Benefits/Benefits";
import Shopping from "../pages/Shopping";
import AccountSettings from "../pages/AccountSettings";
import Settings from "../pages/Settings";
import ChangeAdress from "../pages/changeAdress";
import ChangingPassword from "../pages/ChangingPassword/ChangingPassword";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTab() {
    return(
        <Tab.Navigator
            screenOptions={
                {
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#E30613',
                    },
                }
            }
        >
            <Tab.Screen name="Home" component={Home} 
                options={
                    {
                        tabBarIcon({size, color, focused}) {
                            return <Icon as={HomeIcon} size={25} color="#fff" color={focused ? '#000' : '#fff'}/>
                        },
                    }
                }
            />

            <Tab.Screen name="Store" component={Store} 
                options={
                    {
                        tabBarIcon({size, color, focused}) {
                            return <Icon as={ShoppingBag} size={25} color="#fff" color={focused ? '#000' : '#fff'}/>
                        },
                    }
                }
            />

            <Tab.Screen name="Coffe" component={Coffe} 
                options={
                    {
                        tabBarIcon({size, color, focused}) {
                            return <Icon as={CoffeeIcon} size={30} color="#fff" color={focused ? '#000' : '#fff'}/>
                        },
                    }
                }
            />

            <Tab.Screen name="Library" component={Library} 
                options={
                    {
                        tabBarIcon({size, color, focused}) {
                            return <Icon as={Book} size={25} color={focused ? '#000' : '#fff'}/>
                        },
                    }
                }
            />

            <Tab.Screen name="Benefits" component={Benefits} 
                options={
                    {
                        tabBarIcon({size, color, focused}) {
                            return <Icon as={Gift} size={27} color="#fff" color={focused ? '#000' : '#fff'}/>
                        },
                    }
                }
            />
            <Tab.Screen name="Shopping" component={Shopping} 
                options={
                    {
                        tabBarIcon({size, color, focused}) {
                            return <Icon as={ShoppingCart} size={27} color={focused ? '#000' : '#fff'} />
                        },
                    }
                }
            />
            
            
        </Tab.Navigator>
    );   
}

function AppRoutes():JSX.Element {
    
    return (
        <Stack.Navigator
            screenOptions=
            {
                {
                    headerShown: false   
                }
            }
        >
            <Stack.Screen name='HomeTab' component={HomeTab}/>
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="AccountSettings" component={AccountSettings}/>
            <Stack.Screen name="ChangeAdress" component={ChangeAdress}/>
            <Stack.Screen name="ChangingPassword" component={ChangingPassword}/>
            <Stack.Screen name="Profile" component={Profile}/>

        </Stack.Navigator>
    )
}

export default AppRoutes;