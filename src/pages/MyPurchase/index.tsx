import { ScrollView } from "react-native";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import { useNavigation } from "@react-navigation/native";
import { View } from "@gluestack-ui/themed";

function MyPurchase(): JSX.Element{

    const navigation = useNavigation();






    return(
        <ScrollView>
            <View flex={1}>

                <HeaderWithPoints/>

                

            </View>
        </ScrollView>

    )
}

export default MyPurchase;