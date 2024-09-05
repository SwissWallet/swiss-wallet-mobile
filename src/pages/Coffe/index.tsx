import React from "react";
import { Box, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import DropShadow from "react-native-drop-shadow";
import ListProductCard from "../../components/ListProductCard";
import { ScrollView } from "react-native";

function Coffe():JSX.Element{
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <HeaderWithPoints/>
                <Box mb={-50} ml={22} mt={45}>
                            <Text color="$black" fontWeight={"$bold"} fontSize={40} >
                                Cantina
                            </Text>
                            <Text>
                                confira os lanches da cantina:
                            </Text>
                        </Box>

                    <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>


                        <Box mt={70}>
                            <ListProductCard categoria="CANTEEN"/>    
                        </Box>                    

                        
                    </DropShadow>
            </View>
        </ScrollView>
    );
}

export default Coffe;