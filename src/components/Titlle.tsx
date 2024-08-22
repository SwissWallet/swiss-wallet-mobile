import { Text, View } from "@gluestack-ui/themed";

type GetProps = {
    name: string;
  };

function Titlle(props: GetProps){
    return(
        <View>
            <Text size="4xl" bold color="$black" mb={30}>{props.name}</Text>
        </View>
    )
}

export default Titlle;