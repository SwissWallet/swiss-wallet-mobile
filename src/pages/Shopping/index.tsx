import React, { useEffect, useState } from "react";
import { Box, FlatList, HStack, Icon, Image, RefreshControl, ScrollView, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import Titlle from "../../components/Title";
import api from "../../service/api";
import DropShadow from "react-native-drop-shadow";
import Order from "../../components/Order";
import { Alert, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearList } from "../../redux/reducers/pointsProduct";
import reloadApp from "../../util/ReloadApp";
import { ArrowRightCircle } from "lucide-react-native";

function Shopping(): JSX.Element {

    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const focused = useIsFocused();
    const list:any[] = useSelector((state:any) => state.points.value);
    const [productIds, setProductIds] = useState([]);
    const [valuePoints, setValuePoints] = useState(0);
    const dispatch = useDispatch();
    const reload = useSelector((state:any) => state.reload.value);
    const navigate = useNavigation();

    useEffect(() => {
        loadOrders();
    }, [focused]);

    async function loadOrders() {
        const response = await api.get('orders/current')
            .then((json) => {
                setOrder(json.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        // informa total do pagamento
        const totalPoints = list.reduce((acc, item) => acc + item.points, 0);
        // muda o valor total
        setValuePoints(totalPoints);
        // adiciona os ids dos produtos dentro da lista
        const ids:any = list.map((item:any) => item.id);
        // atualiza os ids no useState
        setProductIds(ids);
    }, [list]);
    
    function handleAlert() {
        Alert.alert('Pagamento', 'Deseja realizar o pagamento agora?', [
            {text: 'Sim', onPress: () => {
                if(verifyProductsSelected()) return Alert.alert('Selecionar Produtos', 'Antes de continuar, selecione os produtos');
                payProducts();
            }},
            {text: 'Realizar Depois', onPress: () => { 
                if(verifyProductsSelected()) return Alert.alert('Selecionar Produtos', 'Antes de continuar, selecione os produtos'); 
                saveShoppingCart();
            }}
        ]);
    }

    function verifyProductsSelected():boolean {
        if (list.length == 0) return true;
        else return false;
    }

    async function saveShoppingCart() {
        const response = await api.post('order/carts', {
            "productIds": productIds
        })
        .then(() => {
            Alert.alert('Futuro Pagamento','Os Produtos foram adicionados em minhas compras');
            dispatch(clearList(productIds.length));
            return loadOrders();
        })
        .catch(err => {
            dispatch(clearList(productIds.length));
            console.log(err.response ? err.response.data : err.message);
            
            if(err.response.status === 403) {
                return Alert.alert('Token', 'O token foi expirado');
            }
            else if (err.response.status === 400) {
                return Alert.alert('Produto', 'O produto está fora de estoque');
            }
            else {
                return Alert.alert('Erro', 'Algum erro inesperado ocorreu, contate o administrador.');
            }
        });
    }

    async function payProducts() {
        const response = await api.post('order/carts', {
            "productIds": productIds
        })
        .then(async (json) => {
            await api.post(`order/carts/paid/${json.data.id}`)
            .then(() => {
                return Alert.alert('Pagamento', 'Pagamento realizado com sucesso');
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 400) {
                    return Alert.alert('Pontos Insuficientes', 'O pedido foi adicionado às suas compras para pagamento futuro.');
                } 
            })
            .finally 
                loadOrders();
                dispatch(clearList(productIds.length));
            
            
        })
        .catch(err => console.log(err));
    }

    if (loading || reload) {
        return (
            <View>
                <HeaderWithPoints />
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl onRefresh={() => reloadApp(dispatch)} refreshing={reload}/>
            }>
            <View flex={1}>
                <HeaderWithPoints />

                <HStack>

                    <Titlle name="Carrinho" />

                    <TouchableOpacity onPress={() => navigate.navigate('Purchase' as never)} >
                        <Box flexDirection="row" mt={65}>
                            <Text color="#000">Minhas compras   </Text>
                            <Icon as={ArrowRightCircle} size="xl" color="#000" accessible accessibilityLabel="Icone seguir para MyPurchase"/>
                        </Box>
                    </TouchableOpacity>

                </HStack>

                <DropShadow style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 4 }}>
                    <Box mt={10}>
                        <FlatList
                            data={order}
                            keyExtractor={(item: any) => item.id}
                            renderItem={({ item }: any) => <Order order={item} />}
                            scrollEnabled={false}
                        />
                    </Box>
                </DropShadow>

                <Box flex={1} justifyContent="flex-end" >
                    <HStack justifyContent="space-between" borderTopColor="#f4f4f43c" borderTopWidth={1}>
                        <Box bgColor="#fff" w={'50%'} h={50} justifyContent="center" alignItems="center" borderRightColor="#7b7b7b" borderRightWidth={1}>
                            <Text color="#000" fontWeight={'$bold'}>
                                Total: {valuePoints}
                            </Text>
                        </Box>

                        <TouchableOpacity style={{width: '100%'}} onPress={() => handleAlert()} accessible accessibilityLabel="Finalizar compra ,botão">
                            <Box bgColor="#ffffff" w={'50%'} h={50} justifyContent="center" alignItems="center">
                                <Text color="#000" fontWeight={'$bold'} >
                                    Finalizar compra
                                </Text>
                            </Box>
                        </TouchableOpacity>
                    </HStack>
                </Box>
            </View>
        </ScrollView>
    );
}

export default Shopping;