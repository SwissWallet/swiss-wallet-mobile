import HeaderWithPoints from "../../components/HeaderWithPoints";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "@gluestack-ui/themed";
import Titlle from "../../components/Title";

function MyPurchase(): JSX.Element{

    const navigation = useNavigation();






    return(
        <ScrollView flex={1}>
            <View flex={1}>

                <HeaderWithPoints/>

                <Titlle name="Minhas Compras"></Titlle>
                
                

            </View>
        </ScrollView>

    )
}

export default MyPurchase;