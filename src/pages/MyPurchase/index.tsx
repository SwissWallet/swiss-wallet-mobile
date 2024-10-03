import HeaderWithPoints from "../../components/HeaderWithPoints";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "@gluestack-ui/themed";

function MyPurchase(): JSX.Element{

    const navigation = useNavigation();






    return(
        <ScrollView flex={1}>
            <View flex={1}>

                <HeaderWithPoints/>

                

            </View>
        </ScrollView>

    )
}

export default MyPurchase;