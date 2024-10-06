import HeaderWithPoints from "../../components/HeaderWithPoints";
import { Actionsheet, ActionsheetContent, ActionsheetDragIndicatorWrapper, Box, FlatList, HStack, RefreshControl, ScrollView, Text, View } from "@gluestack-ui/themed";
import Titlle from "../../components/Title";
import DropBox from "../../components/DropsBoxPurchase";
import api from "../../service/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import reloadApp from "../../util/ReloadApp";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";
import { ListFilter } from "lucide-react-native";
import DropShadow from "react-native-drop-shadow";

function MyPurchase(): JSX.Element {

    const [loading, setLoading] = useState(false);
    const [productsPaid, setProductPaid] = useState([]);
    const [productsPending, setProductsPending] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPaidFilter, setSelectedPaidFilter] = useState(true);
    const [selectedPendingFilter, setSelectedPendingFilter] = useState(false);

    const dispatch = useDispatch();
    const reload = useSelector((state: any) => state.reload.value);

    async function loadCarts() {
        setLoading(true);
        const response = await api.get('order/carts/current')
            .then((json) => {
                const paidProducts = json.data.filter((item: any) => item.status == "PAID");
                const pendingProducts = json.data.filter((item: any) => item.status == "PENDING");

                setProductPaid(paidProducts);
                setProductsPending(pendingProducts);

                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }

    useEffect(() => {
        loadCarts();
    }, [reload]);

    if (loading || reload) {
        return (
            <View>
                <HeaderWithPoints />

                <Titlle name="Minhas Compras" />

                <Box mt={20}>
                    <ActivityIndicator color="#000" size="large" />
                </Box>
            </View>
        );
    }

    return (

        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl onRefresh={() => reloadApp(dispatch)} refreshing={reload} />
        }>

            <View flex={1}>

                <HeaderWithPoints />

                <HStack>
                    <Titlle name="Minhas Compras" />

                    <TouchableOpacity onPress={() => setOpenModal(!openModal)} accessible accessibilityLabel="Abrir modal, botão">
                        <Box mt={65} alignItems="center">
                            <ListFilter color="#000" size={25} />
                        </Box>
                    </TouchableOpacity>

                </HStack>

                <FlatList
                    data={selectedPaidFilter ? productsPaid : productsPending}
                    keyExtractor={(item: any) => item.id}
                    renderItem={(item: any) => <DropBox purchase={item} />}
                    scrollEnabled={false}
                />


                <Actionsheet isOpen={openModal} onClose={() => setOpenModal(!openModal)} >
                    <ActionsheetContent bgColor="#ffffff">
                        <ActionsheetDragIndicatorWrapper bgColor="#000" width={'$1/2'} borderRadius={5} />

                        <Text mt={10} color="#000" fontWeight={'$bold'} fontSize={22}>
                            Flitro
                        </Text>

                        <HStack alignItems="center" justifyContent="flex-start" width={'$full'} ml={10}>
                            <CheckBox accessible accessibilityLabel="Caixa checkbox" value={selectedPaidFilter} onValueChange={setSelectedPaidFilter} onTouchEndCapture={() => {
                                setSelectedPaidFilter(!selectedPaidFilter);
                                setSelectedPendingFilter(!selectedPendingFilter);
                            }}
                            />
                            <Text color="#000" fontWeight={'$semibold'} fontSize={17}>
                                Carrinhos Pagos
                            </Text>
                        </HStack>

                        <HStack alignItems="center" justifyContent="flex-start" width={'$full'} ml={10} mb={20}>
                            <CheckBox accessible accessibilityLabel="Caixa checkbox" value={selectedPendingFilter} onValueChange={setSelectedPendingFilter}
                                onTouchEndCapture={() => {
                                    setSelectedPaidFilter(!selectedPaidFilter);
                                    setSelectedPendingFilter(!selectedPendingFilter);
                                }} />
                            <Text color="#000" fontWeight={'$semibold'} fontSize={17}>
                                Carrinhos Pendentes
                            </Text>
                        </HStack>

                        <DropShadow style={{ shadowColor: "#000", shadowOffset: { width: 1, height: 4 }, shadowOpacity: 0.5, shadowRadius: 2, width: '90%' }}>
                            <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
                                <Box bgColor="#fff" borderColor="#E30613" borderWidth={1} borderRadius={10} mb={20} height={45}>
                                    <Text height={40} color="#E30613" fontWeight="$bold" textAlign="center" textAlignVertical="center" accessible accessibilityLabel="fechar modal, botão">
                                        Fechar
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                        </DropShadow>
                    </ActionsheetContent>
                </Actionsheet>

            </View>
        </ScrollView>


    )
}

export default MyPurchase;