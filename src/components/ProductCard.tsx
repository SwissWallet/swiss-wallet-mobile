//@ts-nocheck
import { Box, HStack, Icon, Image, Text, View } from "@gluestack-ui/themed"
import { Heart } from "lucide-react-native"
import api from "../service/api"
import { useEffect, useState } from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"

interface PropsProductCard{
 categoria : string
}

function ProductCard({categoria}: PropsProductCard):JSX.Element{

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadProduct() {
        const response = await api.get(`/products/category?category=${categoria}`)
        .then((json) => {
            setProducts(json.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
        
    } 

    useEffect(() => {
        loadProduct();
    }, []);
    
    if (loading) {
        return(
            <View>
                <ActivityIndicator color="#000" size="large"/>
            </View>
        )
    }

    return(
        <View>
            <Box>
                <Box justifyContent="center" alignItems="center">
                    <Image source={(`data:image/jpeg;base64,${products[0].image}`)} alt="camisa" width={250} height={330}/> 
                </Box>

                <Box borderRadius={10} bgColor="#2A2A2A" mr={30} ml={30} height={80} justifyContent="center" mt={-25}>

                    <HStack justifyContent="space-evenly" alignItems="center">
                        <Box> 
                            <Text color="$white" fontSize={18} fontWeight={"$bold"}>{products[0].name}</Text>
                            <Text color="$white" fontSize={17} mt={5}>{products[0].value} Pontos</Text>
                        </Box>

                        <TouchableOpacity>
                            <Box bgColor="#C40601" borderRadius={20} width={40} height={40} justifyContent="center" alignItems="center">
                                <Icon as={Heart}  color="#fff" size="xl"/>
                            </Box>
                        </TouchableOpacity>
                    </HStack>
                </Box>
            </Box>

            <Box mt={30} mb={10}>

                <Box justifyContent="center" alignItems="center">
                    <Image source={(`data:image/jpeg;base64,${products[0].image}`)} alt="camisa" width={250} height={330}/> 
                </Box>
                
                <Box borderRadius={10} bgColor="#2A2A2A" mr={30} ml={30} height={80} justifyContent="center" mt={-25}>

                    <HStack justifyContent="space-evenly" alignItems="center">
                        <Box> 
                            <Text color="$white" fontSize={18} fontWeight={"$bold"}>{products[0].name}</Text>
                            <Text color="$white" fontSize={17} mt={5}>{products[0].value} Pontos</Text>
                        </Box>

                        <TouchableOpacity>
                            <Box bgColor="#C40601" borderRadius={20} width={40} height={40} justifyContent="center" alignItems="center">
                                <Icon as={Heart}  color="#fff" size="xl"/>
                            </Box>
                        </TouchableOpacity>
                    </HStack>

                </Box>
            </Box>
        </View>
    )
}

export default ProductCard