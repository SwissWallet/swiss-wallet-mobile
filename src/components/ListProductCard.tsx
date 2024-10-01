//@ts-nocheck
import { Box, FlatList, HStack, Icon, Image, Text, View } from "@gluestack-ui/themed"
import { Heart, ShoppingCart } from "lucide-react-native"
import api from "../service/api"
import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native"
const favorite = require('../util/favorite');

interface PropsProductCard{
 categoria : string
}

async function favoriteProdut(id:string) {
    const response = await favorite({id: id});
    Alert.alert(`Produto`, `${response}`);
}

function ListProductCard({categoria}: PropsProductCard):JSX.Element{

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadProduct() {
        const response = await api.get(`/products/category?category=${categoria}`)
        .then((json) => {
            setProducts(json.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
        
    } 

    useEffect(() => {
        loadProduct();
    }, []);
    
    if (loading) {
        return(
            <View>
                <ActivityIndicator color="#000" size="large"/>
            </View>
        )
    }

    return(
        <FlatList 
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <BoxItem item={item} categoria={categoria}/>}
            scrollEnabled={false}
        />
    )
}

type props = {
    item:Object
    categoria: string
}

function BoxItem({item, categoria}:props):JSX.Element {
    
    function confirmOrder() {
        Alert.alert('Confirmar Pedido', 'Deseja adicionar o pedido no carrinho?', [
            {text: 'Sim', onPress: () => {
                makeOrder(item.id)
            }},
            {text: 'Cancelar'}

        ])
    }

    async function makeOrder(id:string) {
        const response = await api.post(`orders?idProduct=${item.id}`)
        .then(() => {
            return Alert.alert('Pedido adicionado com sucesso')
        })
        .catch(err => console.log(err));
    }

    return(
        <Box ml={22} mr={22} bg="#fff" borderRadius={10} mb={20} pb={20} mt={5}>
            <Box>
                <Box justifyContent="center" alignItems="center">
                    <Image source={(`data:image/jpeg;base64,${item.image}`)} alt={item.name} width={250} height={330} mt={20}/> 
                </Box>

                <Box borderRadius={10} bgColor="#2A2A2A" mr={30} ml={30} height={80} justifyContent="center" mt={-25}>

                    <HStack justifyContent="space-evenly" alignItems="center">
                        <Box> 
                            <Text color="$white" fontSize={18} fontWeight={"$bold"}>{item.name}</Text>
                            <Text color="$white" fontSize={17} mt={5}>{item.value} Pontos</Text>
                        </Box>

                        <TouchableOpacity onPress={() => favoriteProdut(item.id)}>
                            <Box bgColor="#C40601" borderRadius={20} width={40} height={40} justifyContent="center" alignItems="center">
                                <Icon as={Heart}  color="#fff" size="xl" accessible accessibilityLabel="Icone coracao, favoritar, botão"/>
                            </Box>
                        </TouchableOpacity>

                        {
                            categoria === 'STORE' ? 
                            (
                                <TouchableOpacity onPress={confirmOrder}>
                                    <Box bgColor="#C40601" borderRadius={20} width={40} height={40} justifyContent="center" alignItems="center">
                                        <Icon as={ShoppingCart} color="#fff" size="xl" accessible accessibilityLabel="Icone carrinho, fazer pedido, botão"/>
                                    </Box>
                                </TouchableOpacity>
                            ) : 
                            (
                                ''
                            )
                        }
                    </HStack>
                </Box>
            </Box>
        </Box>
    )
}

export default ListProductCard;