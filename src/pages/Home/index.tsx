import React from "react";
import { Box, HStack, Icon, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import { ScrollView } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { Heart } from "lucide-react-native";

function Home():JSX.Element{
    return(
        <View>
            <HeaderWithPoints/>

            <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>

                <Box ml={22} mr={22} bg="#fff" height={98} borderRadius={10} mt={70} mb={20}>
                        
                        <Box ml={22} mt={22}>
                            
                            <HStack space="sm">
                                <Icon as={Heart} color="#000" size="xl"/>
                                <Text color="#000" fontWeight="$semibold">
                                    AAPM
                                </Text>
                            </HStack>

                            <Text textAlign="justify" fontSize={13} mr={22} mt={5} fontWeight="$bold">
                                apoie na gestão da escola no alcance de suas metas e promoção a integração escola-comunidade.
                            </Text>

                        </Box>
                    
                    </Box>
                
            </DropShadow>
        
        </View>
     
    );
}

export default Home;