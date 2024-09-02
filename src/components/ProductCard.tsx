import { Box, Icon, Text, View } from "@gluestack-ui/themed"
import { Heart } from "lucide-react-native"
import api from "../service/api"

interface PropsProductCard{
 name : string,
 descripiton : string,
 points : number
}

function ProductCard({name, descripiton, points}: PropsProductCard):JSX.Element{

    const response = await api.get("",{

    })
    .then((json) => {

    })
    .catch((error) => {

    })


    return(
        <View>

            {/* Imagem do banco */}

            <Box borderRadius={10} bgColor="#2A2A2A" width={140} height={60}>

                <Box> {/* Box para os textos*/}
                    <Text>{name}</Text>
                    <Text>{descripiton}</Text>
                    <Text>{points} Pontos</Text>
                </Box>

                <Box>
                    <Box bgColor="#C40601" borderRadius={10} width={20} height={20}>
                        <Icon as={Heart}  color="#000" size="xl"/>
                    </Box>
                </Box>
            </Box>

        </View>
    )
}

export default ProductCard