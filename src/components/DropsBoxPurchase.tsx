//@ts-nocheck
import { Box, HStack, Icon, Modal, Text, View } from "@gluestack-ui/themed"
import TitleWithoutMargin from "./TitleWithoutMargin";
import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Touchable, TouchableOpacity } from "react-native";

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
                        <TitleWithoutMargin name="Compra"></TitleWithoutMargin>
                        <Icon as={ChevronDown} size="xl" color="#000" accessible accessibilityLabel="Icone abrir compra" mr={25} mt={10}/>
                    </HStack>
                </TouchableOpacity>
            </Box>

            <Box display={modalIsVisible} bgColor="#C6C6C6" mr={25} ml={25} borderBottomStartRadius={10} borderBottomEndRadius={10} borderTopEndRadius={borderRadius} borderTopStartRadius={borderRadius}>
                
            </Box>
        </View>


    )
}

export default DropBox;