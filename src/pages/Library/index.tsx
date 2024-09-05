import React from "react";
import { Box, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import DropShadow from "react-native-drop-shadow";
import ListProductCard from "../../components/ListProductCard";
import { ScrollView } from "react-native";

function Library():JSX.Element{
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <HeaderWithPoints/>

                <Box mb={-50} ml={22} mt={45}>
                            <Text color="$black" fontWeight={"$bold"} fontSize={40} >
                                Biblioteca
                            </Text>
                            <Text>
                                confira os livros da biblioteca:
                            </Text>
                        </Box>

                    <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>


                        <Box mt={70}>
                            <ListProductCard categoria="LIBRARY"/>    
                        </Box>                    

                        
                    </DropShadow>
            </View>
        </ScrollView>
    );
}

export default Library;