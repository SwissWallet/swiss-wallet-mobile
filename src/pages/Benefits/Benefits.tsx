import React, { useEffect, useState } from "react";
import { FlatList, HStack, Icon, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import Titlle from "../../components/Title";
import { Box } from "@gluestack-ui/themed";
import DropShadow from "react-native-drop-shadow";
import TitleWithoutMargin from "../../components/TitleWithoutMargin";
import { ScrollView, TouchableOpacity } from "react-native";
import { Bold, CircleHelp } from "lucide-react-native";
import api from "../../service/api";

function Benefits():JSX.Element{


    const[benefits, setBenefits] = useState([]);


    async function getBenefits() {
        const response = await api.get("/benefit/actives")
        .then((json) => {
            setBenefits(json.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }



    async function solicitarBenefits(id: string) {
        
        const response = await api.post('/benefit/requests', {
            "idBenefit": id
        })
        .then(() => {
            console.log("funfou")
        })
        .catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        getBenefits();
    }, []);

    return(
        <ScrollView>
            <HeaderWithPoints/>

            <Titlle name="Beneficios"/>
            <Text ml={22} width={300}>Confira a lista de beneficios de assinantes da AAPM</Text>


            <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>



            <FlatList
            data={benefits}
            keyExtractor={(item: any) => item.id}
            renderItem={(item: any) =>

                
                <Box mr={22} ml={22} borderRadius={10} bg="#fff" mt={15} mb={10}>

                    <TitleWithoutMargin name={item.item.title}/>
                    <Text ml={22} mt={5} mr={22} mb={15} padding={5} textAlign="justify">{item.item.description}</Text>
                        
                    <TouchableOpacity onPress={() => solicitarBenefits(item.item.id) }>
                        <Box justifyContent="center" alignItems="center" mb={10} >
                            <Box w={200} h={40} bgColor="#C40601" alignItems="center" justifyContent="center" borderRadius={5}>
                                <Text color="#fff" fontWeight={"$bold"}>Solicitar beneficio</Text>
                            </Box>
                        </Box>
                    </TouchableOpacity>
                </Box>
                
                }

            scrollEnabled={false}/>       
            



            </DropShadow>

            

        </ScrollView>
    );
}

export default Benefits;