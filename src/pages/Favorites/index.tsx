//@ts-nocheck
import { Box, HStack, Icon, Image, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import Titlle from "../../components/Title";
import api from "../../service/api";
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Heart, Trash } from "lucide-react-native";
import DropShadow from "react-native-drop-shadow";

function Favorite():JSX.Element {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadFavorite() {
        const response = await api.get('favorites/current')
        .then((json) => {
            setProducts(json.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        loadFavorite();
    }, []);
    

    if (loading) {
        return(
            <View flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator color="#000" size="large"/>
            </View>
        )
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <HeaderWithoutPoints />
                <Titlle name="Favoritos" />
                <Text ml={22} fontSize={17}>
                    Meus pedidos favoritados
                </Text>
                
                <FlatList 
                    data={products}
                    keyExtractor={(item:any) => item.id}
                    renderItem={({item}) => <BoxItem item={item} />}
                    scrollEnabled={false}
                />
                
            </View>
        </ScrollView>
    );
}

type props = {
    item:Object
}

function BoxItem({item}:props):JSX.Element {
    return(
        <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>
            <Box ml={22} mr={22} bg="#fff" borderRadius={10} mb={20} pb={20} mt={20}>
                <Box>
                    <Box justifyContent="center" alignItems="center">
                        <Image source={(`data:image/jpeg;base64,${item.product.image}`)} alt="camisa" width={250} height={330} mt={20}/> 
                    </Box>

                    <Box borderRadius={10} bgColor="#2A2A2A" mr={30} ml={30} height={80} justifyContent="center" mt={-25}>

                        <HStack justifyContent="space-evenly" alignItems="center">
                            <Box> 
                                <Text color="$white" fontSize={18} fontWeight={"$bold"}>{item.product.name}</Text>
                                <Text color="$white" fontSize={17} mt={5}>{item.product.value} Pontos</Text>
                            </Box>

                            <TouchableOpacity >
                                <Box bgColor="#C40601" borderRadius={20} width={40} height={40} justifyContent="center" alignItems="center">
                                    <Icon as={Trash}  color="#fff" size="xl"/>
                                </Box>
                            </TouchableOpacity>
                        </HStack>
                    </Box>
                </Box>
            </Box>
        </DropShadow>
    )
}

export default Favorite;