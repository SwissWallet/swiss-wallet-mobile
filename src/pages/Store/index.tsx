import React from "react";
import { Box, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import ListProductCard from "../../components/ListProductCard";
import DropShadow from "react-native-drop-shadow";
import { ScrollView } from "react-native";

function Store():JSX.Element{
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <HeaderWithPoints/>

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