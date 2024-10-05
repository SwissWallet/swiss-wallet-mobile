import React, { useEffect, useState } from "react";
import { Box, HStack, Icon, RefreshControl, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import { ActivityIndicator, Modal, ScrollView, TouchableOpacity } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { ChevronRight, Heart } from "lucide-react-native";
import ProductCard from "../../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import reloadApp from "../../util/ReloadApp";
import setupNotifications from "../../util/Notifications";

function Home():JSX.Element{

    const navigation = useNavigation();

    const dispatch = useDispatch();
    
    const reload = useSelector((state:any) => state.reload.value);

    useEffect(() => {
        setupNotifications();
    }, []);

    if (reload) {
        return (
            <View>
                <HeaderWithPoints/>
            </View>
        );
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl onRefresh={() => reloadApp(dispatch)} refreshing={reload}/>
        }>
            <View>
                <HeaderWithPoints/>

                <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>

                    <Box ml={22} mr={22} bg="#fff" height={98} borderRadius={10} mt={70} mb={20}>
                            
                            <Box ml={22} mt={22}>
                                
                                <HStack space="sm">
                                    <Icon as={Heart} color="#000" size="xl"/>
                                    <Text color="#000" fontWeight="$semibold">
                                        AAPM
                                    </Text>
                                </HStack>

                                <Text textAlign="justify" fontSize={13} mr={22} mt={5} fontWeight="$bold">
                                    apoie na gestão da escola no alcance de suas metas e promoção a integração escola-comunidade.
                                </Text>

                            </Box>
                        
                    </Box>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Favorite' as never)}>
                        <Box ml={22} mr={22} bg="#fff" height={60} borderRadius={10} mt={15} mb={20} justifyContent="center">
                            
                                <HStack alignItems="center" justifyContent="space-between" ml={22} mr={22}>
                                    <Text fontWeight={"$bold"} fontSize={20} color="#000" accessible accessibilityLabel="Favoritos, botão"> Favoritos</Text>
                                    <Icon as={ChevronRight} color="#000" size="xl"/>
                                </HStack>
                        </Box>
                    </TouchableOpacity>

                    <Box ml={22} mr={22} bg="#fff" borderRadius={10} mt={15} mb={20}>
                            
                        <TouchableOpacity onPress={() => navigation.navigate('Store' as never)}>
                            <HStack justifyContent="space-between" alignItems="center" ml={22} mr={22} mt={20} mb={20}>
                                <Text fontWeight={"$extrabold"} fontSize={25} color="#000" accessible accessibilityLabel="Loja, botão">Loja</Text>
                                <Icon as={ChevronRight} color="#000" size="xl"/>
                            </HStack>
                        </TouchableOpacity>
                        <Box mb={10}>
                            <ProductCard categoria="STORE"/>
                        </Box>                         
                    </Box>
                    
                    <Box ml={22} mr={22} bg="#fff" borderRadius={10} mt={15} mb={20}>
                            
                        <TouchableOpacity onPress={() => navigation.navigate('Coffe' as never)}>
                            <HStack justifyContent="space-between" alignItems="center" ml={22} mr={22} mt={20} mb={20}>
                                <Text fontWeight={"$extrabold"} fontSize={25} color="#000" accessible accessibilityLabel="Catina botão, botão">Cantina</Text>
                                <Icon as={ChevronRight} color="#000" size="xl"/>
                            </HStack>
                        </TouchableOpacity>

                        <Box mb={10}>
                            <ProductCard categoria="CANTEEN"/>
                        </Box>                         
                    </Box>
                    
                    <Box ml={22} mr={22} bg="#fff" borderRadius={10} mt={15} mb={20}>
                            
                        <TouchableOpacity onPress={() => navigation.navigate('Library' as never)}>
                            <HStack justifyContent="space-between" alignItems="center" ml={22} mr={22} mt={20} mb={20}>
                                <Text fontWeight={"$extrabold"} fontSize={25} color="#000">Biblioteca</Text>
                                <Icon as={ChevronRight} color="#000" size="xl"/>
                            </HStack>
                        </TouchableOpacity>

                        <Box mb={10}>
                            <ProductCard categoria="LIBRARY"/>
                        </Box>                         
                    </Box>

                </DropShadow>
            
            </View>
        </ScrollView>
    );
}

export default Home;