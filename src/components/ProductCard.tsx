import { Box, HStack, Icon, Image, Text, View } from "@gluestack-ui/themed"
import { Heart } from "lucide-react-native"
import api from "../service/api"
import { useState } from "react"

interface PropsProductCard{
 categoria : string
}

function ProductCard({categoria}: PropsProductCard):JSX.Element{

    const [products, setProducts] = useState([]);

    async function loadProduct() {
        const response =  api.get(`/products/category?category=${categoria}`)
        .then((json) => {
            setProducts(json.data);
        })
        .catch((error) => {
            console.log(error);
        });
        
    } 

    loadProduct();
    // console.log(products[0].image);
    return(
        <View>

                <Box>

                    <Text mt={15}>
                        Imagem de exemplo
                    </Text>

                    <Box justifyContent="center" alignItems="center">
                        {/* <Image source={require(`data:image/jpeg;base64,${products[0].name}`)}/>  */}
                        {/* <Image source={require('../images/camisa.jpg')} alt="camisa" width={250} height={330} /> */}
                    </Box>

                    <Box borderRadius={10} bgColor="#2A2A2A" mr={30} ml={30} height={80} justifyContent="center" mt={-25}>

                        <HStack justifyContent="space-evenly" alignItems="center">
                            <Box> 
                                <Text color="$white" fontSize={18} fontWeight={"$bold"}>Camisa Destaque</Text>
                                <Text color="$white" fontSize={17} mt={5}>30 Pontos</Text>
                            </Box>

                            
                            <Box bgColor="#C40601" borderRadius={20} width={40} height={40} justifyContent="center" alignItems="center">
                                <Icon as={Heart}  color="#fff" size="xl"/>
                            </Box>
                            
                        </HStack>

                    </Box>

                </Box>



                <Box>

                    <Text mt={15}>
                    imagem do banco
                    </Text>

                    <Box borderRadius={10} bgColor="#2A2A2A" mr={30} ml={30} height={80} justifyContent="center">

                        <HStack justifyContent="space-evenly" alignItems="center">
                            <Box> 
                                <Text color="$white" fontSize={18} fontWeight={"$bold"}>Camisa Destaque</Text>
                                <Text color="$white" fontSize={17} mt={5}>30 Pontos</Text>
                            </Box>

                            
                            <Box bgColor="#C40601" borderRadius={20} width={40} height={40} justifyContent="center" alignItems="center">
                                <Icon as={Heart}  color="#fff" size="xl"/>
                            </Box>
                            
                        </HStack>

                    </Box>

                </Box>
        </View>
    )
}

export default ProductCard