import React from "react";
import { Box, RefreshControl, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import ListProductCard from "../../components/ListProductCard";
import DropShadow from "react-native-drop-shadow";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import reloadApp from "../../util/ReloadApp";

function Store():JSX.Element{

    const reload = useSelector((state:any) => state.reload.value);

    const dispatch = useDispatch();

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

                    <Box mb={-50} ml={22} mt={45}>
                        <Text color="$black" fontWeight={"$bold"} fontSize={40} >
                            Loja
                        </Text>
                        <Text>
                            confira as melhores opções de produtos:
                        </Text>
                    </Box>

                <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>


                    <Box mt={70}>
                        <ListProductCard categoria="STORE"/>    
                    </Box>                    

                    
                </DropShadow>
            </View>
        </ScrollView>
    );
}

export default Store;