//@ts-nocheck
import { Box, Button, ButtonText, HStack, Icon, Modal, Text, View } from "@gluestack-ui/themed"
import TitleWithoutMargin from "./TitleWithoutMargin";
import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

function DropBox(): JSX.Element{


    const [modalIsVisible, setModalIsVisible] = useState('none');
    const [borderRadius, setBorderRadius] = useState(10);


    const handleProductSelect = () => {
        setModalIsVisible(modalIsVisible == 'flex' ? 'none' : 'flex');
        setBorderRadius(borderRadius == 0 ? 10 : 0)

      };

      

    return(
        <View >
            <Box bgColor="#C6C6C6" mr={25} ml={25} borderBottomStartRadius={borderRadius} borderBottomEndRadius={borderRadius} borderTopEndRadius={10} borderTopStartRadius={10} >
                <TouchableOpacity onPress={() => handleProductSelect()}>
                    <HStack alignItems="center" justifyContent="space-between">
                        <TitleWithoutMargin name="Compra" ></TitleWithoutMargin>
                        <Icon as={ChevronDown} size="xl" color="#000" accessible accessibilityLabel="Icone abrir compra" mr={25} mt={10}/>
                    </HStack>
                </TouchableOpacity>
            </Box>

            <Box display={modalIsVisible} bgColor="#C6C6C6" mr={25} ml={25} borderBottomStartRadius={10} borderBottomEndRadius={10} borderTopEndRadius={borderRadius} borderTopStartRadius={borderRadius}>

                <HStack mr={25} ml={25} mt={10} justifyContent="space-between">
                    <Text>- Camisa</Text>
                    <Text> 40 pontos</Text>
                    <Text>19/02/2005</Text>
                </HStack>




                <HStack justifyContent="flex-end" mt={20} mb={10}  >

                        <TouchableOpacity>
                            <Box w={110} h={27} mr={10} bgColor="#C40601" alignItems="center" justifyContent="center" borderRadius={5}>
                                <Text color="#fff">Cancelar</Text>
                            </Box>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Box w={110} h={27} mr={10} bgColor="#C40601" alignItems="center" justifyContent="center" borderRadius={5}>
                                <Text color="#fff">Finalizar</Text>
                            </Box>
                        </TouchableOpacity>
                </HStack>
            </Box>

        </View>


    )
}

export default DropBox;