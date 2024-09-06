//@ts-nocheck
import { Box, HStack, Icon, Image, Text, View } from "@gluestack-ui/themed";
import { Trash } from "lucide-react-native";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import DropShadow from "react-native-drop-shadow";
import api from "../service/api";
import { useNavigation } from "@react-navigation/native";

type props = {
    order:Object
}

function Order({order}:props):JSX.Element {
    
    const navigation = useNavigation();

    let color;
    let status;
    
    if (order.status === 'COMPLETED') {
        color = '#848484'
        status = 'Finalizado'
    }
    else if (order.status === 'SEPARETD') {
        color = '#006d12'
        status = 'Pronto para retirada'
    }
    else if (order.status === 'ANALYSIS') {
        color = '#FFFF1B'
        status = 'Em análise'
    }
    else {
        color = 'red'
        status = 'Não disposnível'
    }

    function confirmDeleteOrder() {
        
        Alert.alert('Cancelar Pedido', 'Deseja cancelar o pedido?', 
            [
                {
                    text: 'Confirmar', onPress: () => {
                        deleteOrder();
                    }
                },
                {
                    text: 'Cancelar', style: 'cancel'
                }
        ]);
    }
    
    async function deleteOrder() {
        const response = await api.delete(`orders?idOrder=${order.id}`)
        .then(() => {
            Alert.alert('Pedido', 'Pedido Cancelado');
            navigation.replace('Shopping')
        })
        .catch(err => console.log(err));
    }


    return(
        <Box ml={22} mr={22} bg="#fff" borderRadius={10} mb={20} mt={5}>
            <Box>
                <Box justifyContent="center" alignItems="center">
                    <Image source={(`data:image/jpeg;base64,${order.product.image}`)} alt="camisa" width={250} height={330} mt={20}/> 
                </Box>
                
                <Box bgColor="#c6c6c6a7" pl={22} pr={22} pt={10} pb={10}>
                    
                    <HStack justifyContent="space-between" alignItems="center" mb={5}>
                        <Text color="#000" fontWeight={"$bold"} fontSize={25}>
                            {order.product.name}
                        </Text>
                        <TouchableOpacity onPress={confirmDeleteOrder}>
                            <Box bgColor="#C40601" borderRadius={20} width={40} height={40} justifyContent="center" alignItems="center">
                                <Icon as={Trash} color="#fff" size="xl"/>
                            </Box>
                        </TouchableOpacity>
                    </HStack>
                    
                    <HStack space="md">
                        <Box bgColor={color} width={22} height={22} borderRadius={50}/>
                        <Text color="#000" fontWeight="bold" fontSize={17}>
                            {status}
                        </Text>
                    </HStack>
                </Box>         
            </Box>
        </Box>
    );
}

export default Order;