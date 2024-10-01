//@ts-nocheck
import { Box, HStack, Icon, Image, Text, View } from "@gluestack-ui/themed";
import { Trash } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import DropShadow from "react-native-drop-shadow";
import api from "../service/api";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { addPoints, removePoints } from "../redux/reducers/pointsProduct";

type props = {
    order:Object
}

function Order({order}:props):JSX.Element {
    
    const navigation = useNavigation();

    const [active, setActive] = useState(false);
    const list:any[] = useSelector((state:any) => state.points.value);
    const dispatch = useDispatch();
    
    function confirmDeleteOrder() {
        
        Alert.alert('Cancelar Pedido', 'Deseja remover o pedido do carrinho?', 
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

    useEffect(() => {
        list.map((item) => {
            if (item.id == order.product.id) setActive(true);
        })
    }, []);
    
    async function deleteOrder() {
        const response = await api.delete(`orders?idOrder=${order.id}`)
        .then(() => {
            Alert.alert('Pedido', 'Pedido removido do carrinho');
            dispatch(removePoints(order.product.id));
            navigation.replace('HomeTab', {screen: 'Shopping'})
        })
        .catch(err => console.log(err));
    }

    return(
        <Box ml={22} mr={22} bg="#fff" borderRadius={10} mb={20} mt={5}>
            <Box>
                <Box flexDirection="row">
                    <HStack alignItems="center" space="lg" m={10}>
                        <CheckBox value={active} onValueChange={setActive} onTouchEndCapture={() => {
                                if (!active) {
                                    dispatch(addPoints(order.product.id, order.product.value))
                                }
                                else {
                                    dispatch(removePoints(order.product.id))
                                }
                            }}
                        />
                        <Image source={(`data:image/jpeg;base64,${order.product.image}`)} alt={order.product.name} width={65} height={85}/> 
                    </HStack>
                    
                    <Box>
                        <Text color="#000" fontWeight={'$bold'} fontSize={20} mt={20}>
                            {order.product.name}
                        </Text>
                        <Text color="#000" fontWeight={'$bold'} fontSize={16}> 
                            {order.product.value} Pontos
                        </Text>    
                    </Box>
                </Box>

                <Box justifyContent="flex-end" alignItems="flex-end" mt={-30} mr={10} mb={10}>
                    <TouchableOpacity onPress={confirmDeleteOrder}>
                        <Box bgColor="#C40601" borderRadius={20} width={35} height={35} justifyContent="center" alignItems="center">
                            <Icon as={Trash} color="#fff" size="md" accessible accessibilityLabel="Icone, cancelar pedido ,botão"/>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </Box>
    );
}

export default Order;