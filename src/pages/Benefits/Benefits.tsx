import React, { useEffect, useState } from "react";
import { FlatList, HStack, Icon, Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import Titlle from "../../components/Title";
import { Box } from "@gluestack-ui/themed";
import DropShadow from "react-native-drop-shadow";
import TitleWithoutMargin from "../../components/TitleWithoutMargin";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { Bold, CircleHelp } from "lucide-react-native";
import api from "../../service/api";

function Benefits():JSX.Element{


    const[benefits, setBenefits] = useState([]);
    const[status, setStatus] = useState([]);

    async function benefitStatus() {
        const response = await api.get("/benefit/requests/current")
        .then((json) => {
            setBenefits(json.data.activeResponseDtos);
            setStatus(json.data.reqResponseDtos)
            // console.log(json.data.reqResponseDtos)
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
            return Alert.alert("O beneficio foi solicitado")
        })
        .catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        benefitStatus();
    }, []);

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderWithPoints/>

            <Titlle name="Beneficios"/>
            <Text ml={22} width={300}>Confira a lista de beneficios de assinantes da AAPM</Text>


            <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>


            <Titlle name="Disponiveis"></Titlle>
            <FlatList
            data={benefits}
            keyExtractor={(item: any) => item.id}
            renderItem={(item: any) => 

               
                <Box mr={22} ml={22} borderRadius={10} bg="#fff" mt={15} mb={10} padding={20}>

                    <TitleWithoutMargin name={item.item.title}/>
                    <Text ml={22} mt={5} mr={22} mb={15} padding={5} textAlign="justify" w={250}>{item.item.description}</Text>
                        
                    <TouchableOpacity onPress={() => solicitarBenefits(item.item.id)}>
                        <Box justifyContent="center" alignItems="center" mb={10}>
                            <Box w={200} h={40} bgColor="#C40601" alignItems="center" justifyContent="center" borderRadius={5}>
                                <Text color="#fff" fontWeight={"$bold"}>Solicitar beneficio</Text>
                            </Box>
                        </Box>
                    </TouchableOpacity>
                </Box>
                
                }

            scrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}/>       
            

            <Titlle name="Pendente"></Titlle>
            <FlatList
            data={status}
            keyExtractor={(item: any) => item.id}
            renderItem={(item: any) => 

               
                <Box mr={22} ml={22} borderRadius={10} bg="#fff" mt={15} mb={10} padding={20}>

                    <TitleWithoutMargin name={item.item.benefitActive.title}/>
                    <Text ml={22} mt={5} mr={22}  padding={5} textAlign="justify" w={250}>{item.item.benefitActive.description}</Text>
                        
                </Box>
                
                }

            scrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}/>   



            </DropShadow>

            

        </ScrollView>
    );
}

export default Benefits;