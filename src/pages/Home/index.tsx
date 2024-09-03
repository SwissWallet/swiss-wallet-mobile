import React from "react";
import { Box, HStack, Icon, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import { ScrollView } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { ChevronRight, Heart } from "lucide-react-native";
import ProductCard from "../../components/ProductCard";

function Home():JSX.Element{



    return(

        <ScrollView>
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
                
                <Box ml={22} mr={22} bg="#fff" height={60} borderRadius={10} mt={15} mb={20} justifyContent="center">
                    
                        <HStack alignItems="center" justifyContent="space-between" ml={22} mr={22}>
                            <Text fontWeight={"$bold"} fontSize={20} color="#000"> Favoritos</Text>
                            <Icon as={ChevronRight} color="#000" size="xl"/>
                        </HStack>

                </Box>

                <Box ml={22} mr={22} bg="#fff" borderRadius={10} mt={15} mb={20}>
                        
                            <HStack justifyContent="space-between" alignItems="center" ml={22} mr={22} mt={10}>
                                <Text fontWeight={"$extrabold"} fontSize={25} color="#000">Camisas</Text>
                                <Icon as={ChevronRight} color="#000" size="xl"/>
                            </HStack>

                            <Box mb={10}>
                                <ProductCard categoria="STORE"/>
                            </Box>                         
                </Box>



            </DropShadow>
        
        </View>
        </ScrollView>
    );
}

export default Home;