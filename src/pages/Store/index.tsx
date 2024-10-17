import React, { useState } from "react";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, Box, HStack, RefreshControl, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import ListProductCard from "../../components/ListProductCard";
import DropShadow from "react-native-drop-shadow";
import { ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import reloadApp from "../../util/ReloadApp";
import BuyPointsModal from "../../components/BuyPoints";
import { Coins } from "lucide-react-native";

function Store(): JSX.Element {

    const reload = useSelector((state: any) => state.reload.value);
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    if (reload) {
        return (
            <View>
                <HeaderWithPoints />
            </View>
        );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl onRefresh={() => reloadApp(dispatch)} refreshing={reload} />
        }>
            <View>

                <HeaderWithPoints />

                <Box>
                    <HStack justifyContent="space-between">
                        <Box mt={45} ml={22}>
                            <Text fontSize={40} fontWeight={'$bold'} color="#000">
                                Loja
                            </Text>
                            <Text fontSize={17}>
                                Confira os produtos da loja
                            </Text>
                        </Box>

                        <TouchableOpacity onPress={() => setOpenModal(!openModal)} accessible accessibilityLabel="Abrir modal, botão">
                            <Box mt={65} alignItems="center" mr={22}>
                                <Coins color="#000" size={29} />
                            </Box>
                        </TouchableOpacity>
                    </HStack>
                </Box>

                <DropShadow style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 4 }}>


                    <Box mt={70}>
                        <ListProductCard categoria="STORE" />
                    </Box>


                </DropShadow>


                <Actionsheet isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent>
                        <BuyPointsModal />
                    </ActionsheetContent>
                </Actionsheet>

            </View>
        </ScrollView>
    );
}

export default Store;